import { useState } from "react";
import { useUserAuth } from "../../context/userAuthContext";
import UserAuth from "./UserAuth";
import { Button, Modal } from "react-bootstrap";

const UserWidget = () => {
  const { user, logout } = useUserAuth();
  const [isModalShow, setIsModalShow] = useState(false);

  const handleLogout = () => {
    setIsModalShow(false);
    logout();
  };

  return (
    <>
      <div className="UserWidget">
        <div onClick={() => setIsModalShow(!isModalShow)}>
          {user ? (
            <img
              className="d-flex m-auto"
              src={user.photoURL}
              alt="Foto de perfil"
            />
          ) : (<><i className="fa fa-user"></i></>)}
        </div >

        <Modal
          className="UserWidget"
          dialogClassName="custom-dialog"
          contentClassName="custom-modal"
          show={isModalShow}
          onHide={() => setIsModalShow(!isModalShow)}
        >
          <Modal.Header className="flex-column">
            {user ? (
              <img
                className="d-flex m-auto"
                src={user.photoURL}
                alt="Foto de perfil"
              />
            ) : (<><i className="fa fa-user"></i></>)}
            {user && (
              <>u
                <p className="m-0">
                  <b>{user.displayName}</b>
                </p>
                <p className="m-0">{user.email}</p>
              </>
            )}
          </Modal.Header>
          <Modal.Body>
            {user ? (
              <div className="d-flex flex-column align-items-end" style={{ maxWidth: '250px', margin: '0 0 0 auto' }}>
                <Button style={{ margin: '5px' }} variant="warning w-100" >Administrar cuenta</Button>
                <Button style={{ margin: '5px' }} variant="secondary w-100" onClick={handleLogout}>Cerrar sesión</Button>{' '}
              </div>
            ) : (
              <>
                <UserAuth />
              </>
            )}
          </Modal.Body>
        </Modal>
      </div >
    </>
  );
};

export default UserWidget;