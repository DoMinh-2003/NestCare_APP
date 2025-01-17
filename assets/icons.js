import { AntDesign, Feather } from "@expo/vector-icons";
export const icons = {
  home: (props) => <Feather name="home" size={26} {...props} />,
  explore: (props) => (
    <AntDesign name="user" size={26} color="black" {...props} />
  ),
};
