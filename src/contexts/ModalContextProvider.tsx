import React, { createContext, useReducer, useContext } from "react";
import { StringMap } from "helpers/interfaces";
export interface ModalState {
  isModal: boolean;
  modalData?: StringMap | null;
  isDeleteModal: boolean;
  openModal: (i?: any) => void;
  closeModal: () => void;
  openDeleteModal: (i?: any) => void;
  deleteModalData?: StringMap | null;
  closeDeleteModal: () => void;
}

export const initialState: ModalState = {
  isModal: false,
  modalData: null,
  isDeleteModal: false,
  openModal: () => { },
  closeModal: () => { },
  openDeleteModal: () => { },
  deleteModalData: null,
  closeDeleteModal: () => { },
};

export const ModalContext = createContext(initialState);

export const ModalContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const controlReducer = (state: ModalState, action: any): ModalState => {
    switch (action.name) {
      case "MODAL":
        return {
          ...state,
          isModal: !state.isModal,
          modalData: action.modalData,
        };
      case "DELETE_MODAL":
        return {
          ...state,
          isDeleteModal: !state.isDeleteModal,
          deleteModalData: action.deleteModalData,
        };
      default:
        return {
          ...state,
        };
    }
  };

  const [state, dispatch] = useReducer(controlReducer, initialState);

  const modalActions = React.useMemo(
    () => ({
      openModal: (modalData: StringMap | null = null) => {
        dispatch({
          name: "MODAL",
          modalData,
        });
      },
      closeModal: () => {
        dispatch({
          name: "MODAL",
          modalData: null,
        });
      },
      openDeleteModal: (deleteModalData: StringMap | null = null) => {
        dispatch({
          name: "DELETE_MODAL",
          deleteModalData,
        });
      },
      closeDeleteModal: () => {
        dispatch({
          name: "DELETE_MODAL",
          deleteModalData: null,
        });
      },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <ModalContext.Provider
      value={{
        ...state,
        ...modalActions,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error("useModal must be used within a ModalContext");
  }
  return context;
};
