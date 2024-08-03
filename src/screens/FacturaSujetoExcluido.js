import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, FlatList, ScrollView, StyleSheet } from 'react-native';
import Input from '../components/Inputs/Input';
import Buttons from '../components/Buttons/Button';
import * as Constantes from '../utils/constantes';
import fetchData from '../utils/fetchdata';
import ComboBox from '../components/Combo box/ComboBox';

const App = () => {
  const [view, setView] = useState('list');
  const [facturas, setFacturas] = useState([]);
  const [form, setForm] = useState({
    idFactura: '',
    descripcion: '',
    monto: '',
    tipoServicio: '',
    cliente: '',
    servicio: '',
    fechaEmision: ''
  });

  const initialFormState = {
    idFactura: '',
    descripcion: '',
    monto: '',
    tipoServicio: '',
    cliente: '',
    servicio: '',
    fechaEmision: ''
  };

  const [tipoServicios, setTipoServicios] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [servicios, setServicios] = useState([]);

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        console.log('Fetching tipoServicios...');
        const tipoServiciosResponse = await fetchData('tipo_servicios', 'GET');
        console.log('tipoServiciosResponse:', tipoServiciosResponse);

        console.log('Fetching clientes...');
        const clientesResponse = await fetchData('clientes', 'GET');
        console.log('clientesResponse:', clientesResponse);

        console.log('Fetching servicios...');
        const serviciosResponse = await fetchData('servicios', 'GET');
        console.log('serviciosResponse:', serviciosResponse);

        if (tipoServiciosResponse.error) {
          throw new Error(tipoServiciosResponse.message);
        }

        if (clientesResponse.error) {
          throw new Error(clientesResponse.message);
        }

        if (serviciosResponse.error) {
          throw new Error(serviciosResponse.message);
        }

        setTipoServicios(tipoServiciosResponse.dataset.map(item => ({
          value: item.id_servicio,
          label: item.nombre_servicio,
        })));

        setClientes(clientesResponse.dataset.map(item => ({
          value: item.id_cliente,
          label: item.nombre_cliente,
        })));

        setServicios(serviciosResponse.dataset.map(item => ({
          value: item.id_servicio,
          label: item.nombre_servicio,
        })));
      } catch (error) {
        console.error('Error al cargar los datos:', error);
        Alert.alert('Error', 'No se pudieron cargar las opciones.');
      }
    };

    fetchDataAsync();
  }, []);

  useEffect(() => {
    if (view === 'create') {
      setForm(initialFormState);
    }
  }, [view]);

  const handleCreate = async () => {
    const formData = new FormData();
    formData.append('descripcion', form.descripcion);
    formData.append('monto', form.monto);
    formData.append('tipoServicio', form.tipoServicio);
    formData.append('cliente', form.cliente);
    formData.append('servicio', form.servicio);
    formData.append('fechaEmision', form.fechaEmision);

    try {
      const response = await fetchData('factura_sujeto_excluido_data_admin', 'POST', formData);
      if (response.status) {
        setView('list');
        refreshList();
      } else {
        Alert.alert('Error', response.error || 'Error desconocido al crear la factura');
      }
    } catch (error) {
      console.error('Error en handleCreate:', error);
      Alert.alert('Error', 'Ocurrió un error al crear la factura');
    }
  };

  const handleUpdate = async () => {
    const formData = new FormData();
    formData.append('idFactura', form.idFactura);
    formData.append('descripcion', form.descripcion);
    formData.append('monto', form.monto);
    formData.append('tipoServicio', form.tipoServicio);
    formData.append('cliente', form.cliente);
    formData.append('servicio', form.servicio);
    formData.append('fechaEmision', form.fechaEmision);

    try {
      const response = await fetchData('factura_sujeto_excluido_data_admin', 'PUT', formData);
      if (response.status) {
        setView('list');
        refreshList();
      } else {
        Alert.alert('Error', response.error || 'Error desconocido al actualizar la factura');
      }
    } catch (error) {
      console.error('Error en handleUpdate:', error);
      Alert.alert('Error', 'Ocurrió un error al actualizar la factura');
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetchData(`factura_sujeto_excluido_data_admin/${id}`, 'DELETE');
      if (response.status) {
        refreshList();
      } else {
        Alert.alert('Error', response.error || 'Error desconocido al eliminar la factura');
      }
    } catch (error) {
      console.error('Error en handleDelete:', error);
      Alert.alert('Error', 'Ocurrió un error al eliminar la factura');
    }
  };

  const refreshList = async () => {
    try {
      const response = await fetchData('factura_sujeto_excluido_data_admin', 'GET');
      setFacturas(response.dataset);
    } catch (error) {
      console.error('Error al refrescar la lista:', error);
    }
  };

  const handleEdit = async (id) => {
    try {
      const response = await fetchData(`factura_sujeto_excluido_data_admin/${id}`, 'GET');
      if (response.status) {
        setForm({
          idFactura: response.dataset.id_factura,
          descripcion: response.dataset.descripcion_servicio,
          monto: response.dataset.monto_servicio,
          tipoServicio: response.dataset.tipo_servicio,
          cliente: response.dataset.cliente,
          servicio: response.dataset.id_servicio,
          fechaEmision: response.dataset.fecha_emision
        });
        setView('edit');
      } else {
        Alert.alert('Error', response.error || 'Error desconocido al obtener la factura');
      }
    } catch (error) {
      console.error('Error en handleEdit:', error);
      Alert.alert('Error', 'Ocurrió un error al obtener la factura');
    }
  };

  const renderView = () => {
    switch (view) {
      case 'list':
        return (
          <View style={styles.listContainer}>
            <Text style={styles.texto}>Usuarios para factura sujeto excluido electrónico</Text>
            <Buttons textoBoton="Agregar Factura" accionBoton={() => setView('create')} />
            <FlatList
              data={facturas}
              keyExtractor={item => item.id_factura.toString()}
              renderItem={({ item }) => (
                <View style={styles.itemContainer}>
                  <Text style={styles.itemText}>{item.descripcion_servicio}</Text>
                  <View style={styles.buttonsContainer}>
                    <TouchableOpacity onPress={() => handleEdit(item.id_factura)} style={styles.button}>
                      <Text style={styles.buttonText}>Editar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleDelete(item.id_factura)} style={styles.button}>
                      <Text style={styles.buttonText}>Eliminar</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            />
          </View>
        );
      case 'create':
      case 'edit':
        return (
          <ScrollView contentContainerStyle={styles.formContainer}>
            <Text style={styles.texto}>{view === 'create' ? 'Crear Factura' : 'Editar Factura'}</Text>
            <Input
              placeHolder='Descripción del Servicio'
              setValor={form.descripcion}
              setTextChange={(text) => setForm({ ...form, descripcion: text })}
            />
            <Input
              placeHolder='Monto del Servicio'
              setValor={form.monto}
              setTextChange={(text) => setForm({ ...form, monto: text })}
            />
            <ComboBox
              placeHolder='Tipo de Servicio'
              data={tipoServicios}
              selectedValue={form.tipoServicio}
              onValueChange={(value) => setForm({ ...form, tipoServicio: value })}
            />
            <ComboBox
              placeHolder='Cliente'
              data={clientes}
              selectedValue={form.cliente}
              onValueChange={(value) => setForm({ ...form, cliente: value })}
            />
            <ComboBox
              placeHolder='Servicio'
              data={servicios}
              selectedValue={form.servicio}
              onValueChange={(value) => setForm({ ...form, servicio: value })}
            />
            <Input
              placeHolder='Fecha de Emisión'
              setValor={form.fechaEmision}
              setTextChange={(text) => setForm({ ...form, fechaEmision: text })}
            />
            <Buttons
              textoBoton={view === 'create' ? 'Agregar usuario' : 'Actualizar usuario'}
              accionBoton={view === 'create' ? handleCreate : handleUpdate}
            />
            <Buttons
              textoBoton='Cancelar'
              accionBoton={() => setView('list')}
            />
          </ScrollView>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      {renderView()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  listContainer: {
    flex: 1,
  },
  texto: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  itemContainer: {
    padding: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
  itemText: {
    fontSize: 16,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
  formContainer: {
    paddingBottom: 20,
  },
});

export default App;