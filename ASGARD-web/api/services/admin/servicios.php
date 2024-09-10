<?php
// Se incluye la clase del modelo.
require_once('../../models/data/servicios_data.php');

// Se comprueba si existe una acción a realizar, de lo contrario se finaliza el script con un mensaje de error.
if (isset($_GET['action'])) {
    // Se crea una sesión o se reanuda la actual para poder utilizar variables de sesión en el script.
    session_start();
    // Se instancia la clase correspondiente.
    $servicios = new ServiciosData;
    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array('status' => 0, 'message' => null, 'dataset' => null, 'error' => null, 'exception' => null, 'fileStatus' => null);
    // Se verifica si existe una sesión iniciada como administrador, de lo contrario se finaliza el script con un mensaje de error.
    if (isset($_SESSION['idAdministrador'])) {
        // Se compara la acción a realizar cuando un administrador ha iniciado sesión.
        switch ($_GET['action']) {
            
            case 'searchRows':
                if (!Validator::validateSearch($_POST['search'])) {
                    $result['error'] = Validator::getSearchError();
                } elseif ($result['dataset'] = $servicios->searchRows()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' coincidencias';
                } else {
                    $result['error'] = 'No hay coincidencias';
                }
                break;
                case 'montoTotalPorServicios':
                    if ($result['dataset'] = $servicios->montoTotalPorServicios()) {
                        $result['status'] = 1;
                    } else {
                        $result['error'] = 'No hay datos disponibles';
                    }
                    break;
        
            case 'serviciosOfrecidos':
                if ($result['dataset'] = $servicios->serviciosOfrecidos()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'No hay datos disponibles';
                }
                break;

                case 'readAll':
                    if ($result['dataset'] = $servicios->readAll()) {
                        $result['status'] = 1;
                        $result['message'] = 'Existen ' . count($result['dataset']) . ' registros';
                    } else {
                        $result['error'] = 'No existen servicios creados';
                    }
                    break;
                    case 'createRow':
                        $_POST = Validator::validateForm($_POST);
                        if (
                            !$servicios->setNombre($_POST['nombreServico']) or
                            !$servicios->setDescripcion($_POST['descripcionServicio']) 
                        ) {
                            $result['error'] = $servicios->getDataError();
                        } elseif ($servicios->createRow()) {
                            $result['status'] = 1;
                            $result['message'] = 'El servicio fue creado correctamente';
                        } else {
                            $result['error'] = 'Ocurrió un problema al crear el servicio';
                        }
                        break;

                        case 'updateRow':
                            $_POST = Validator::validateForm($_POST);
                            if (
                                
                                !$servicios->setId($_POST['idServicio']) or
                                !$servicios->setNombre($_POST['nombreServico']) or
                                !$servicios->setDescripcion($_POST['descripcionServicio']) 
                   
                            ) {
                                $result['error'] = $servicios->getDataError();
                            } elseif ($servicios->updateRow()) {
                                $result['status'] = 1;
                                $result['message'] = 'El servicio fue modificado correctamente';
                            } else {
                                $result['error'] = 'Ocurrió un problema al modificar el servicio';
                            }
                            break;

                            case 'deleteRow':
                                // Agregar depuración para verificar la recepción de datos
                                error_log('Datos recibidos en deleteRow: ' . json_encode($_POST));
                                if (!isset($_POST['idServicio'])) {
                                    $result['error'] = 'El idCliente no está definido';
                                } elseif (!$servicios->setId($_POST['idServicio'])) {
                                    $result['error'] = $servicios->getDataError();
                                } elseif ($servicios->deleteRow()) {
                                    $result['status'] = 1;
                                    $result['message'] = 'Servicio eliminado correctamente';
                                } else {
                                    $result['error'] = 'Ocurrió un problema al eliminar el servicio';
                                }
                                break;

                        
                                case 'readOne':
                                    if (!$servicios->setId($_POST['idServicio'] )) {
                                        $result['error'] = 'Servicio incorrecto';
                                    } elseif ($result['dataset'] = $servicios->readOne()) {
                                        $result['status'] = 1;
                                    } else {
                                        $result['error'] = 'Servicio inexistente';
                                    }
                                    break;

                                    case 'facturasPorMes':
                                        $data = $servicios->facturasPorMes();
                                        error_log('Datos devueltos de facturasPorMes: ' . print_r($data, true)); // Depura los datos devueltos
                                        if ($result['dataset'] = $data) {
                                            $result['status'] = 1;
                                        } else {
                                            $result['error'] = 'No hay datos disponibles';
                                        }
                                        break;


                                case 'clientesPorDepartamento':
                                    if ($result['dataset'] = $departamentos->clientesPorDepartamento()) {
                                        $result['status'] = 1;
                                    } else {
                                        $result['error'] = 'No hay datos disponibles';
                                    }
                                     break;
                                    
           
            default:
                $result['error'] = 'Acción no disponible dentro de la sesión';
        }
        // Se obtiene la excepción del servidor de base de datos por si ocurrió un problema.
        $result['exception'] = Database::getException();
        // Se indica el tipo de contenido a mostrar y su respectivo conjunto de caracteres.
        header('Content-type: application/json; charset=utf-8');
        // Se imprime el resultado en formato JSON y se retorna al controlador.
        print(json_encode($result));
    } else {
        print(json_encode('Acceso denegado'));
    }
} else {
    print(json_encode('Recurso no disponible'));
}
