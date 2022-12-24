import { useState } from "react";
import { useUserAuth } from "../../context/userAuthContext";

import { toast } from "react-toastify";

const UserAuth = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    password2: "",
  });
  const [isLogin, setIsLogin] = useState(true);
  const { signUp, login, loginWithGoogle, resetPassword } = useUserAuth();

  let operationText = "";
  if (isLogin) operationText = "Iniciar sesión";
  else operationText = "Registro";

  const handleChange = ({ target: { name, value } }) =>
    setUser({ ...user, [name]: value });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isLogin) login(user.email, user.password);
    else {
      if (user.password !== user.password2) {
        toast.warn("Las contraseñas ingresadas no coinciden", { theme: "dark" });
        return;
      }

      if (user.firstName.length < 2 || user.lastName.length < 2) {
        toast.warn("Ingrese un nombre y apellido válido", { theme: "dark" });
        return;
      }

      signUp(user.firstName, user.lastName, user.email, user.password, "BL", "0000FF", "https://mario.wiki.gallery/images/0/01/MKT_174CB.png");
    }
  };

  const handleOperation = () => setIsLogin(!isLogin);

  const handlerLoginWithGoogle = () => loginWithGoogle();

  const handlerResetPassword = async () => {
    if (!user.email) return toast.warn("Por favor, ingresar un email", { theme: "dark" });

    resetPassword(user.email)
      .then(() => toast("Revise su casilla de email", { theme: "dark" }))
      .catch((error) => toast.error(error.message, { theme: "dark" }));
  };

  return (
    <div className="UserAuth card itemCard">
      <div className="card-body">
        <h3>{operationText}</h3>
        <form onSubmit={handleSubmit} className="form-group">
          {!isLogin && (
            <>
              <input
                type="text"
                placeholder="Nombre"
                name="firstName"
                id="firstName"
                onChange={handleChange}
              />
              <input
                type="text"
                placeholder="Apellido"
                name="lastName"
                id="lastName"
                onChange={handleChange}
              />
            </>
          )}
          <input
            type="email"
            placeholder="email@email.com"
            name="email"
            id="email"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Contraseña"
            name="password"
            id="password"
            onChange={handleChange}
          />

          {!isLogin && (
            <input
              type="password"
              placeholder="Ingrese nuevamente la contraseña"
              name="password2"
              id="password2"
              onChange={handleChange}
            />
          )}

          <div className="row">
            <div className="col-auto m-auto">
              <button className="btnMain" type="submit">
                {operationText}
              </button>
            </div>

            <div className="col d-flex flex-column align-items-end m-auto">
              <small>
                {isLogin ? "¿Aún no tenés cuenta?" : "¿Ya tenés cuenta?"}
                <b>
                  <a href="#!" onClick={handleOperation}>
                    {isLogin ? " REGISTRARSE" : " INGRESAR"}
                  </a>
                </b>
              </small>

              {isLogin && (
                <a onClick={handlerResetPassword} href="#!">
                  <small className="text-muted">¿Olvidaste tu password?</small>
                </a>
              )}
            </div>
          </div>
        </form>
      </div>

      <div className="card-footer m-auto">
        <button onClick={handlerLoginWithGoogle}>
          Ingresar con <i className="fab fa-google" />
        </button>
      </div>
    </div>
  );
};

export default UserAuth;