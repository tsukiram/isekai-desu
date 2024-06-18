import React from "react";
import FormulirKoleksi from "./formAddNovel/formCollection";

class FormAddNovel extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <h3 className="fw-bolder ms-5 mt-4">Tambah Novel</h3>
        <FormulirKoleksi />
      </div>
    );
  }
}

export default FormAddNovel;
