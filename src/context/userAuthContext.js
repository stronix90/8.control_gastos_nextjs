import { createContext, useContext } from "react";
import { useState, useEffect } from "react";

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { auth } from "../conexion.js";
import { toast } from "react-toastify";

const contexto = createContext();
const { Provider } = contexto;

export const useUserAuth = () => {
  return useContext(contexto);
};

const UserAuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const signUp = async (firstName, lastName, email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        updateProfile(auth.currentUser, {
          displayName: `${firstName} ${lastName}`,
          photoURL: "./img/profilePicture.png",
        }).catch((error) => {
          toast.error(error.message, { theme: "dark" });
        });
        toast.success("Usuario creado correctamente", { theme: "dark" });
      })

      .catch((error) => {
        let msg = "";
        switch (error.code) {
          case "auth/email-already-in-use":
            msg = "El email ya se encuentra registrado";
            break;

          case "auth/weak-password":
            msg = "La contraseña debe tener al menos 6 caracteres";
            break;

          case "auth/invalid-email":
            msg = "El email ingresado es inválido";
            break;

          default:
            msg = error.message;
            break;
        }
        toast.error(msg, { theme: "dark" });
      });
  };

  const login = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => toast.success("Ha iniciado sesión correctamente", { theme: "dark" }))

      .catch((error) => {
        let msg = "";
        switch (error.code) {
          case "auth/invalid-email":
            msg = "El email ingresado es inválido";
            break;

          case "auth/internal-error":
            msg = "Por favor, ingrese su contraseña";
            break;

          case "auth/wrong-password":
            msg = "El password ingresado es incorrecto";
            break;

          case "auth/user-not-found":
            msg = "Usuario inexistente";
            break;

          default:
            msg = error.message;
            break;
        }
        toast.error(msg, { theme: "dark" });
      });
  };

  const loginWithGoogle = () => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider).catch((error) =>
      toast.error(error.message)
    );
  };

  const logout = () => {
    signOut(auth).catch((error) => toast.error(error.message, { theme: "dark" }));
  };

  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  const valorDelContexto = {
    user,
    signUp,
    login,
    loginWithGoogle,
    logout,
    resetPassword,
  };

  return <Provider value={valorDelContexto}>{children}</Provider>;
};

export default UserAuthProvider;