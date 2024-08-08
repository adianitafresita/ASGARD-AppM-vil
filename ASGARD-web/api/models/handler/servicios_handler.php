<?php
// Se incluye la clase para trabajar con la base de datos.
require_once('../../helpers/database.php');

/*
*	Clase para manejar el comportamiento de los datos de la tabla SERVICIOS
*/
class ServiciosHandler
{
    /*
     *   Declaración de atributos para el manejo de datos.
     */
    protected $id_servicio= null;
    protected $id_cliente = null;
    protected $nombre_servicio = null;
    protected $descripcion = null;

    public function serviciosOfrecidos()
    {
        $sql = 'SELECT 
    tipo_servicio,
    COUNT(*) AS cantidad
FROM 
    tb_servicios
GROUP BY 
    tipo_servicio;
';
        return Database::getRows($sql);
    }

    // Método para leer todos los usuarios.
    public function readAll()
    {
        $sql = 'SELECT id_servicio, nombre_servicio, descripcion, id_cliente
                FROM tb_servicios
                ORDER BY nombre_servicio';
        return Database::getRows($sql);
    }

    public function readOne()
    {
        $sql = 'SELECT id_servicio, nombre_servicio, descripcion, id_cliente
                FROM tb_servicios
                WHERE nombre_servicio = ?';
        $params = array($this->id_servicio);
        return Database::getRow($sql, $params);
    }
}