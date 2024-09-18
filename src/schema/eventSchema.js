import * as yup from "yup";

export const addEventSchema = yup.object().shape({
  eventTitle: yup.string().required("Event name is required."),
});

export const addEventClientSchema = yup.object().shape({
  eventTitle: yup.string().required("Event name is required."),
  clientName: yup.string().required("Client's name is required."),
  clientEmail: yup
    .string()
    .email("Invalid email.")
    .required("Client's email is required."),
});
