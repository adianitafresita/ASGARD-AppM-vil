import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, FlatList, ScrollView, StyleSheet } from 'react-native';
import Input from '../components/Inputs/Input_crud';
import Buttons from '../components/Buttons/Button';
import * as Constantes from '../utils/constantes';
import fetchData from '../utils/fetchdata';
import ComboBox from '../components/Combo box/ComboBox';

const App = () => {
  const ip = Constantes.IP;
  const [view, setView] = useState('list');
  const [usuarios, setId] = useState([]);
  const [servicios, setServicios] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [form, setForm] = useState({
    idFactura: '',
    descripcion: '',
    tipo_servicio: '',
    id_servicio: '',
    id_cliente: '',
    monto: '',
    fecha_emision: '',
  });

  const initialFormState = {
    idFactura: '',
    descripcion: '',
    tipo_servicio: '',
    id_servicio: '',
    id_cliente: '',
    monto: '',
    fecha_emision: '',
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const serviciosResponse = await fetch(`${ip}/ASGARD/api/services/admin/factura_sujeto_excluido.php?action=readAllservicio`);
        const serviciosData = await serviciosResponse.json();
        console.log('Servicios data:', serviciosData);
        setServicios(serviciosData.dataset);
  
        const clientesResponse = await fetch(`${ip}/ASGARD/api/services/admin/factura_sujeto_excluido.php?action=readAllclientes`);
        const clientesData = await clientesResponse.json();
        console.log('Clientes data:', clientesData);
        setClientes(clientesData.dataset);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);

  useEffect(() => {
    if (view === 'create') {
      setForm(initialFormState);
    }
  }, [view]);

  const handleCreate = async () => {
    const formData = new FormData();
    formData.append('descripcion', form.descripcion);
    formData.append('tipo_servicio', form.tipo_servicio);
    formData.append('id_servicio', form.id_servicio);
    formData.append('id_cliente', form.id_cliente);
    formData.append('monto', form.monto);
    formData.append('fecha_emision', form.fecha_emision);

    try {
      const response = await fetch(`${ip}/ASGARD/api/services/admin/factura_sujeto_excluido.php?action=createRow`, {
        method: 'POST',
        body: formData
      });
      const data = await response.json();
      if (data.status) {
        setView('list');
        refreshList();
      } else {
        Alert.alert('Error', data.error || 'Error al crear el registro');
      }
    } catch (error) {
      console.error('Error al enviar datos:', error);
      Alert.alert('Error', 'Ocurrió un error al crear el registro');
    }
  };

  const handleUpdate = async () => {
    const formData = new FormData();
    formData.append('idFactura', form.idFactura);
    formData.append('descripcion', form.descripcion);
    formData.append('tipo_servicio', form.tipo_servicio);
    formData.append('id_servicio', form.id_servicio);
    formData.append('id_cliente', form.id_cliente);
    formData.append('monto', form.monto);
    formData.append('fecha_emision', form.fecha_emision);

    try {
      const response = await fetch(`${ip}/ASGARD/api/services/admin/factura_sujeto_excluido.php?action=updateRow`, {
        method: 'POST',
        body: formData
      });
      const data = await response.json();
      if (data.status) {
        setView('list');
        refreshList();
      } else {
        Alert.alert('Error', data.error);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Ocurrió un error al actualizar el usuario');
    }
  };

  const handleDelete = async (id) => {
    const formData = new FormData();
    formData.append('idFactura', id);

    try {
      const response = await fetch(`${ip}/ASGARD/api/services/admin/factura_sujeto_excluido.php?action=deleteRow`, {
        method: 'POST',
        body: formData
      });
      const data = await response.json();
      if (data.status) {
        refreshList();
      } else {
        Alert.alert('Error', data.error);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Ocurrió un error al eliminar el usuario');
    }
  };

  const refreshList = () => {
    fetch(`${ip}/ASGARD/api/services/admin/factura_sujeto_excluido.php?action=readAll`)
      .then(response => response.json())
      .then(data => setId(data.dataset));
  };

  const handleEdit = async (id) => {
    const formData = new FormData();
    formData.append('idFactura', id);

    try {
      const response = await fetch(`${ip}/ASGARD/api/services/admin/factura_sujeto_excluido.php?action=readOne`, {
        method: 'POST',
        body: formData
      });
      const data = await response.json();
      if (data.status) {
        setForm({
          idFactura: data.dataset.id_factura,
          descripcion: data.dataset.descripcion,
          tipo_servicio: data.dataset.tipo_servicio,
          id_servicio: data.dataset.id_servicio,
          id_cliente: data.dataset.id_cliente,
          monto: data.dataset.monto,
          fecha_emision: data.dataset.fecha_emision,
        });
        setView('edit');
      } else {
        Alert.alert('Error', data.error);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Ocurrió un error al obtener el usuario');
    }
  };

  const renderView = () => {
    switch (view) {
      case 'list':
        return (
          <View style={styles.listContainer}>
            <Text style={styles.texto}>Sujeto Excluido</Text>
            <Buttons textoBoton="Agregar usuario" accionBoton={() => setView('create')} />
            <FlatList
              data={usuarios}
              keyExtractor={item => item.id_factura.toString()}
              renderItem={({ item }) => (
                <View style={styles.itemContainer}>
                  <Text style={styles.itemText}>{item.descripcion}</Text>
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
            <Text style={styles.texto}>{view === 'create' ? 'Crear Usuario' : 'Editar Usuario'}</Text>
            <Input
              placeHolder='Descripción'
              setValor={form.descripcion}
              setTextChange={(text) => setForm({ ...form, descripcion: text })}
            />
            <ComboBox
              placeHolder='Tipo Servicio'
              options={[
                { label: 'Credito Fiscal', value: 'Credito Fiscal' },
                { label: 'Factura Consumidor Final', value: 'Factura Consumidor Final' },
                { label: 'Factura Sujeto Excluido', value: 'Factura Sujeto Excluido' },
                { label: 'Otro', value: 'Otro' },
              ]}
              selectedValue={form.tipo_servicio}
              onValueChange={(value) => setForm({ ...form, tipo_servicio: value })}
            />
            <ComboBox
              placeHolder='Servicio'
              options={servicios.length > 0 ? servicios.map(servicio => ({ label: servicio.nombre, value: servicio.id_servicio })) : []}
              selectedValue={form.id_servicio}
              onValueChange={(value) => setForm({ ...form, id_servicio: value })}
            />
            <ComboBox
              placeHolder='Cliente'
              options={clientes.map(cliente => ({
                label: cliente.nombre_cliente,
                value: id_cliente,
              }))}
              selectedValue={form.id_cliente}
              onValueChange={(value) => setForm({ ...form, id_cliente: value })}
            />
            <Input
              placeHolder='Monto'
              setValor={form.monto}
              setTextChange={(text) => setForm({ ...form, monto: text })}
            />
            <Input
              placeHolder='Fecha Emisión'
              setValor={form.fecha_emision}
              setTextChange={(text) => setForm({ ...form, fecha_emision: text })}
            />
            <Buttons
              textoBoton={view === 'create' ? 'Crear' : 'Actualizar'}
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemText: {
    fontSize: 18,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default App;