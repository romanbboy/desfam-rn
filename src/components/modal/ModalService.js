import React from "react";
import ModalConfirm from "./index";
import {ModalService} from "@ui-kitten/components";

export default {
  confirm: ({msg, accept}) => {
    let modalId = '';
    const hideModal = () => ModalService.hide(modalId);

    const handlerAccept = async () => {
      let res = await accept();
      if (res) hideModal();
    }
    modalId = ModalService.show(
      <ModalConfirm msg={msg} accept={handlerAccept} reject={hideModal} />,
      {backdropStyle: {backgroundColor: 'rgba(0, 0, 0, 0.4)'}}
    );
  }
}

// 61a62147fc2a5834508737d7

// Kolya 6128f2423dd5552cfc925f55

