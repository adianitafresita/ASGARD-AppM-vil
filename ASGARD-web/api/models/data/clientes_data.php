<?php
// Se incluye la clase para validar los datos de entrada.
require_once('../../helpers/validator.php');
// Se incluye la clase padre.
require_once('../../models/handler/clientes_handler.php');
/*
*	Clase para manejar el encapsulamiento de los datos de la tabla CLIENTE.
*/
class ClienteData extends ClienteHandler
{
    // Atributo genérico para manejo de errores.
    private $data_error = null;
    private $filename = null;


    /*
    *   Métodos para validar y establecer los datos.
    */
    public function setId($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->id = $value;
            return true;
        } else {
            $this->data_error = 'El identificador del cliente es incorrecto';
            return false;
        }
    }

    public function setNombre($value, $min = 2, $max = 100)
    {
        if (!Validator::validateAlphabetic($value)) {
            $this->data_error = 'El nombre debe ser un valor alfabético';
            return false;
        } elseif (Validator::validateLength($value, $min, $max)) {
            $this->nombre = $value;
            return true;
        } else {
            $this->data_error = 'El nombre debe tener una longitud entre ' . $min . ' y ' . $max;
            return false;
        }
    }

    public function setApellido($value, $min = 2, $max = 100)
    {
        if (!Validator::validateAlphabetic($value)) {
            $this->data_error = 'El apellido debe ser un valor alfabético';
            return false;
        } elseif (Validator::validateLength($value, $min, $max)) {
            $this->apellido = $value;
            return true;
        } else {
            $this->data_error = 'El apellido debe tener una longitud entre ' . $min . ' y ' . $max;
            return false;
        }
    }

    public function setCorreo($value, $min = 8, $max = 100)
    {
        if (!Validator::validateEmail($value)) {
            $this->data_error = 'El correo no es válido';
            return false;
        } elseif (!Validator::validateLength($value, $min, $max)) {
            $this->data_error = 'El correo debe tener una longitud entre ' . $min . ' y ' . $max;
            return false;
        } elseif($this->checkDuplicate($value)) {
            $this->data_error = 'El correo ingresado ya existe';
            return false;
        } else {
            $this->correo = $value;
            return true;
        }
    }

    public function setTelefono($value)
    {
        if (Validator::validatePhone($value)) {
            $this->telefono = $value;
            return true;
        } else {
            $this->data_error = 'El teléfono debe tener el formato (2, 6, 7)###-####';
            return false;
        }
    }

    public function setDireccion($value, $min = 5, $max = 100)
{
    if (!Validator::validateAlphanumeric($value)) {
        $this->data_error = 'La dirección debe ser alfanumérica';
        return false;
    } elseif (Validator::validateLength($value, $min, $max)) {
        $this->direccion = $value;
        return true;
    } else {
        $this->data_error = 'La dirección debe tener una longitud entre ' . $min . ' y ' . $max;
        return false;
    }
}

public function setDepartamento($value, $min = 2, $max = 250)
{
    if (!Validator::validateAlphabetic($value)) {
        $this->data_error = 'El departamento debe ser un valor alfabético';
        return false;
    } elseif (Validator::validateLength($value, $min, $max)) {
        $this->departamento = $value;
        return true;
    } else {
        $this->data_error = 'El departamento debe tener una longitud entre ' . $min . ' y ' . $max;
        return false;
    }
}

public function setMunicipio($value, $min = 2, $max = 100)
{
    if (!Validator::validateAlphabetic($value)) {
        $this->data_error = 'El municipio debe ser un valor alfabético';
        return false;
    } elseif (Validator::validateLength($value, $min, $max)) {
        $this->municipio = $value;
        return true;
    } else {
        $this->data_error = 'El municipio debe tener una longitud entre ' . $min . ' y ' . $max;
        return false;
    }
}

public function setDUI($value)
{
    if (!Validator::validateDUI($value)) {
        $this->data_error = 'El DUI debe tener el formato ########-#';
        return false;
    } else {
        $this->dui = $value;
        return true;
    }
}

public function setImagen($file, $filename = null)
{
    if (Validator::validateImageFile($file, 1000)) {
        $this->imagen = Validator::getFilename();
        return true;
    } elseif (Validator::getFileError()) {
        $this->data_error = Validator::getFileError();
        return false;
    } elseif ($filename) {
        $this->imagen = $filename;
        return true;
    } else {
        $this->imagen = 'default.png';
        return true;
    }
}

    // Método para obtener el error de los datos.
    public function getDataError()
    {
        return $this->data_error;
    }
    public function getFilename()
    {
        return $this->filename;
    }
}

