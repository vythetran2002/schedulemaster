import React, { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { addEventSchema } from "@/schema/eventSchema";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { eventColors } from "@/static/eventColors";
import { createEvent } from "@/utils/event-utils";
import toast from "react-hot-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UploadImageToCloudinary } from "@/services/cloudinary";
import { addEventClientSchema } from "@/schema/eventSchema";
import { AddEventIntoCookie } from "@/models/Event";

function AddEventDialog(props) {
  const { open, handleChangeOpen, selectedDate } = props;

  const [isSpecialEvent, setIsSpecialEvent] = useState(false);
  const [avatarSrc, setAvatarSrc] = useState(null);
  const [schema, setSchema] = useState(addEventSchema);

  const form = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      eventTitle: "",
    },
  });

  //refs
  const inputFileRef = useRef(null);

  const [selectedColor, setSelectedColor] = React.useState(
    eventColors[0].value
  );

  const RestForm = () => {
    setSelectedColor(eventColors[0].value); //reset initial color
    setAvatarSrc(null);
    setSchema(addEventSchema);
    setIsSpecialEvent(false);
    handleChangeOpen(false);
    form.reset();
  };

  const onSubmit = (values) => {
    let calendarApi = selectedDate.view.calendar;
    // calendarApi.unselect(); // clear date selections
    let newEvent = createEvent(
      values.eventTitle,
      selectedDate.startStr,
      selectedDate.endStr,
      selectedDate.allDay,
      selectedColor,
      avatarSrc,
      values?.clientName,
      values?.clientEmail
    );

    calendarApi.addEvent(newEvent);
    toast.success("Add event successfully");
    RestForm();
    AddEventIntoCookie(newEvent); // push new event into cookie
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append(
        "upload_preset",
        process.env.NEXT_PUBLIC_CLOUDINARY_PRESET
      );
      const result = UploadImageToCloudinary(formData);
      toast.promise(result, {
        loading: "loading...",
        success: (result) => {
          setAvatarSrc(result);
          return "Upload image successfully";
        },
        error: <b>${"Something's wrong"}</b>,
      });
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        RestForm();
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Please enter your event:</DialogTitle>
          <DialogDescription>Fill all the information</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-3"
          >
            <FormField
              control={form.control}
              name="eventTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Event Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Event Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="eventColor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Event Color</FormLabel>
                  <FormControl>
                    <div className="grid grid-cols-3 gap-4 ">
                      {eventColors.map((color) => (
                        <label
                          key={color.id}
                          className="flex items-center space-x-2 cursor-pointer "
                        >
                          <input
                            type="radio"
                            name="color"
                            value={color.value}
                            checked={selectedColor === color.value}
                            onChange={() => setSelectedColor(color.value)}
                            className="sr-only"
                          />
                          <span
                            className={`w-8 h-8 rounded-full border-2  ${
                              selectedColor === color.value
                                ? "border-black"
                                : "border-gray-300"
                            }`}
                            style={{ backgroundColor: color.value }}
                          ></span>
                          <span className="text-sm text-gray-700 dark:text-white">
                            {color.label}
                          </span>
                        </label>
                      ))}
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="items-top flex space-x-2 mt-3">
              <Checkbox
                id="specEvent"
                onCheckedChange={(value) => {
                  setIsSpecialEvent(!isSpecialEvent);
                  setAvatarSrc(null);
                  if (value) {
                    setSchema(addEventClientSchema);
                  } else {
                    setSchema(addEventSchema);
                  }
                }}
              />
              <div className="grid  leading-none">
                <label
                  htmlFor="specEvent"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Special event
                </label>
                <p className="text-sm text-muted-foreground">
                  Create an appointment event
                </p>
              </div>
            </div>
            {isSpecialEvent && (
              <div className="flex items-center">
                <div className="flex items-center gap-3 flex-col justify-center p-7 flex-[0.4]">
                  <Avatar
                    className="cursor-pointer w-[100px] h-[100px] border-[3px] border-[balck]"
                    onClick={() => {
                      inputFileRef.current.click();
                    }}
                  >
                    <AvatarImage src={avatarSrc} />
                    <AvatarFallback>Client</AvatarFallback>
                  </Avatar>
                  {avatarSrc ? (
                    <div
                      className="bg-[#f87171] t hover:bg-[#dc2626] px-2 py-2 cursor-pointer duration-200 rounded-lg text-white
                    text-sm
                    "
                      onClick={() => {
                        setAvatarSrc(null);
                        toast.success("Removed image");
                      }}
                    >
                      Remove Image
                    </div>
                  ) : (
                    <div
                      className="bg-light-blue hover:bg-dark-blue px-4 py-2 cursor-pointer duration-200 rounded-lg text-white
                    text-sm 
                    "
                      onClick={() => {
                        inputFileRef.current.click();
                      }}
                    >
                      Add Image
                    </div>
                  )}

                  <input
                    accept="image/*"
                    ref={inputFileRef}
                    className="hidden"
                    type="file"
                    onChange={handleFileChange}
                  />
                </div>
                <div className="flex flex-col gap-3 flex-1">
                  <FormField
                    control={form.control}
                    name="clientName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{"Name"}</FormLabel>
                        <FormControl>
                          <Input placeholder="Client's Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="clientEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{"Email"}</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="Client's Email"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            )}

            <Button className="" type="submit">
              Add Event
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default AddEventDialog;
