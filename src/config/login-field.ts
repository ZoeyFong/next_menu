export type TFormFields = {
  username: string
  password: string
}

export const loginFields = [
  {
    label: "User Name",
    value: "username",
    type: "text",
  },
  {
    label: "Password",
    value: "password",
    type: "password",
  },
]

export const defaultFieldsVal: TFormFields = { username: "", password: "" }
