import * as React from "react";

export enum DrawerAnchorEnum {
  Left = "left",
  Right = "right",
  Bottom = "bottom",
}

interface UserData {
  Name: string;
  Email: string;
  PhoneNumber: string;
}
interface IContext {
  openDrawer: boolean;
  setOpenDrawer: React.Dispatch<React.SetStateAction<boolean>>;
  drawerComp: string;
  setDrawerComp: React.Dispatch<React.SetStateAction<string>>;
  drawerAnchor: DrawerAnchorEnum;
  setdrawerAnchor: React.Dispatch<React.SetStateAction<DrawerAnchorEnum>>;
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
  uid: string;
  setUid: React.Dispatch<React.SetStateAction<string>>;
  checkedNotification: boolean;
  setCheckedNotification: React.Dispatch<React.SetStateAction<boolean>>;
  userData: UserData;
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
}

const AuthContext = React.createContext<IContext>({
  openDrawer: false,
  setOpenDrawer: () => {},
  drawerComp: "",
  setDrawerComp: () => {},
  drawerAnchor: DrawerAnchorEnum.Left,
  setdrawerAnchor: () => {},
  theme: "light",
  setTheme: () => {},
  uid: "",
  setUid: () => {},
  checkedNotification: false,
  setCheckedNotification: () => {},
  userData: {
    Name: "",
    Email: "",
    PhoneNumber: "",
  },
  setUserData: () => {},
});

const Store: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [openDrawer, setOpenDrawer] = React.useState<boolean>(false);
  const [drawerComp, setDrawerComp] = React.useState<string>("");
  const [checkedNotification, setCheckedNotification] =
    React.useState<boolean>(false);

  const [drawerAnchor, setdrawerAnchor] = React.useState<DrawerAnchorEnum>(
    DrawerAnchorEnum.Left
  );
  const [theme, setTheme] = React.useState("light");
  const [uid, setUid] = React.useState("");
  const [userData, setUserData] = React.useState({
    Name: "",
    Email: "",
    PhoneNumber: "",
  });

  return (
    <AuthContext.Provider
      value={{
        openDrawer,
        setOpenDrawer,
        drawerComp,
        setDrawerComp,
        drawerAnchor,
        setdrawerAnchor,
        theme,
        setTheme,
        uid,
        setUid,
        checkedNotification,
        setCheckedNotification,
        userData,
        setUserData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { Store, AuthContext };
