import React from "react";
import { FormKoleksiProvider } from "./formValidation";
import TextFormKoleksi from "./title";
import UploadIMG from "./formUploadIMG";
import FormTitle from "./formTitle";
import GenreOption from "./formGenre";
import FormDescription from "./formDescription";
import FormContent from "./formContent";
import FormBtn from "./formBtn";

class FormulirKoleksi extends React.Component {
  render() {
    return (
      <FormKoleksiProvider>
        <div className="container-fluid">
          <div className="container d-flex flex-column gap-4 my-6">
            <TextFormKoleksi />
            <UploadIMG />
          </div>
          <hr className="ms-5 me-5"></hr>
          <div className="container d-flex flex-column gap-4 my-6">
            <FormTitle />
            <GenreOption />
            <FormDescription />
            <FormContent />
            <FormBtn />
          </div>
        </div>
      </FormKoleksiProvider>
    );
  }
}

export default FormulirKoleksi;
