import React from "react";
import { useForm } from "react-hook-form";
import { edadValidator } from "./validators";

const Formulario = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues:{
        nombre:"Mario",
        direccion:"mario@mario.con"
    }
  });

  const onSubmit = (data) => {
    console.log("Datos", data);
  };
  const incluirTelefono = watch("incluirTelefono");
  return (
    <div>
      <h2>Formulario</h2>
      <p>Nombre: {watch("nombre")}</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Nombre</label>
          <input
            type="text"
            name="nombre"
            {...register("nombre", {
              required: true,
            })}
          />
          {errors.nombre?.type === "required" && (
            <p
              style={{
                background: "red",
                width: "18%",
                color: "white",
                margin: "0 auto",
              }}
            >
              El campo nombre es requerido
            </p>
          )}
        </div>
        <div>
          <label>Direccion</label>
          <input type="text" name="direccion" {...register("direccion")} />
        </div>

        <div>
          <label>Edad</label>
          <input
            type="text"
            name="edad"
            {...register("edad", {
              required: true,
              maxLength: 3,
              validate: edadValidator,
            })}
          />
          {errors.edad && <p>La edad debe estar entre 18 y 35</p>}
        </div>
        <div>
          <label>Pais</label>
          <select {...register("pais")}>
            <option value="es">Espania</option>
            <option value="it">Italia</option>
            <option value="fr">Francia</option>
          </select>
        </div>
        <div>
          <label>Incluir Telefono?</label>
          <input type="checkbox" {...register("incluirTelefono")} />
        </div>
        {incluirTelefono && (
          <div>
            <label>Telefono</label>
            <input type="text" {...register("telefono")} />
          </div>
        )}
        <input type="submit" value="enviar" />
      </form>
    </div>
  );
};

export default Formulario;
