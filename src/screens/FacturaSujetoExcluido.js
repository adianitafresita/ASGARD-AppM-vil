import React, { useState, useEffect } from 'react';
import { View, Text, Alert, FlatList, ScrollView, StyleSheet, TextInput } from 'react-native';
import Input from '../components/Inputs/Input_crud';
import Buttons from '../components/Buttons/Button';
import fetchData from '../utils/fetchdata';
import ComboBox from '../components/Combo box/ComboBox';
import * as Constantes from '../utils/constantes';
import Card from '../components/Card/CardCrud';

const App = () => {
  const ip = Constantes.IP;
  const [view, setView] = useState('list');
  const [usuarios, setUsuarios] = useState([]);
  const [servicios, setServicios] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [form, setForm] = useState({
    idFactura: '',
    descripcion: '',
    tipo_servicio: '',
    id_servicio: '',
    id_cliente: '',
    monto: '',
    fecha_emision: '',
  });

  /**
   * Estado inicial del formulario.
   */
  const initialFormState = {
    idFactura: '',
    descripcion: '',
    tipo_servicio: '',
    id_servicio: '',
    id_cliente: '',
    monto: '',
    fecha_emision: '',
  };

  /**
   * Obtiene datos de la API al montar el componente.
   */
  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        const serviciosResponse = await fetchData('factura_sujeto_excluido', 'readAllservicio');
        if (serviciosResponse.status) {
          setServicios(serviciosResponse.dataset);
        } else {
          console.error('Error fetching services:', serviciosResponse.message);
        }

        const clientesResponse = await fetchData('factura_sujeto_excluido', 'readAllclientes');
        if (clientesResponse.status) {
          setClientes(clientesResponse.dataset);
        } else {
          console.error('Error fetching clients:', clientesResponse.message);
        }

        const data = await fetchData('factura_sujeto_excluido', 'readAll');
        if (data.status) {
          setUsuarios(data.dataset);
          setFilteredData(data.dataset);
        } else {
          console.error('Error fetching users:', data.message);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchDataFromApi();
  }, [ip]);

  /**
   * Filtra datos según la consulta de búsqueda.
   */
  useEffect(() => {
    const filterData = () => {
      if (searchQuery === '') {
        setFilteredData(usuarios);
      } else {
        const filtered = usuarios.filter(item =>
          item.descripcion.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (item.nombre_cliente && item.nombre_cliente.toLowerCase().includes(searchQuery.toLowerCase()))
        );
        setFilteredData(filtered);
      }
    };

    filterData();
  }, [searchQuery, usuarios]);

  /**
   * Restablece el estado del formulario cuando se cambia a crear.
   */
  useEffect(() => {
    if (view === 'create') {
      setForm(initialFormState);
    }
  }, [view]);

  /**
   * Maneja la creación de una nueva factura.
   */
  const handleCreate = async () => {
    try {
      const data = await fetchData('factura_sujeto_excluido', 'createRow', {
        descripcion: form.descripcion,
        tipo_servicio: form.tipo_servicio,
        id_servicio: form.id_servicio,
        id_cliente: form.id_cliente,
        monto: form.monto,
        fecha_emision: form.fecha_emision
      });
      if (data.status) {
        setView('list');
        refreshList();
      } else {
        Alert.alert('Error', data.message || 'Error al crear el registro');
      }
    } catch (error) {
      console.error('Error al crear el registro:', error);
      Alert.alert('Error', 'Ocurrió un error al crear el registro');
    }
  };

  const handleUpdate = async () => {
    try {
      const data = await fetchData('factura_sujeto_excluido', 'updateRow', form);
      if (data.status) {
        setView('list');
        refreshList();
      } else {
        Alert.alert('Error', data.message || 'Error al actualizar el registro');
      }
    } catch (error) {
      console.error('Error al actualizar el registro:', error);
      Alert.alert('Error', 'Ocurrió un error al actualizar el registro');
    }
  };

  const handleDelete = async (id) => {
    try {
      const data = await fetchData('factura_sujeto_excluido', 'deleteRow', { idFactura: id });
      if (data.status) {
        refreshList();
      } else {
        Alert.alert('Error', data.message || 'Error al eliminar el registro');
      }
    } catch (error) {
      console.error('Error al eliminar el registro:', error);
      Alert.alert('Error', 'Ocurrió un error al eliminar el registro');
    }
  };

  const refreshList = async () => {
    try {
      const data = await fetchData('factura_sujeto_excluido', 'readAll');
      if (data.status) {
        setUsuarios(data.dataset || []);
        setFilteredData(data.dataset || []);
      }
    } catch (error) {
      console.error('Error al obtener los datos:', error);
    }
  };

  const handleEdit = async (id) => {
    try {
      const data = await fetchData('factura_sujeto_excluido', 'readOne', { idFactura: id });
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
        Alert.alert('Error', data.message || 'Error al obtener el registro');
      }
    } catch (error) {
      console.error('Error al obtener el registro:', error);
      Alert.alert('Error', 'Ocurrió un error al obtener el registro');
    }
  };

  const handleClientChange = async (clientId) => {
    setForm({ ...form, id_cliente: clientId });

    try {
      const data = await fetchData('clientes', 'readOne', { id_cliente: clientId });
      if (data.status) {
      } else {
        Alert.alert('Error', data.message || 'Error al obtener los detalles del cliente');
      }
    } catch (error) {
      console.error('Error al obtener los detalles del cliente:', error);
      Alert.alert('Error', 'Error al obtener los detalles del cliente');
    }
  };

  const handleServiceChange = async (serviceId) => {
    setForm({ ...form, id_servicio: serviceId });

    try {
      const data = await fetchData('servicios', 'readOne', { id_servicio: serviceId });
      if (data.status) {
      } else {
        Alert.alert('Error', data.message || 'Error al obtener los detalles del servicio');
      }
    } catch (error) {
      console.error('Error al obtener los detalles del servicio:', error);
      Alert.alert('Error', 'Error al obtener los detalles del servicio');
    }
  };

  const renderView = () => {
    switch (view) {
      case 'list':
        return (
          <View style={styles.listContainer}>
            <Text style={styles.texto}>Sujeto Excluido</Text>
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar por descripción o cliente"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            <Buttons textoBoton="Agregar usuario" accionBoton={() => setView('create')} />
            <FlatList
              data={filteredData}
              keyExtractor={(item) => item.id_factura.toString()}
              renderItem={({ item }) => (
                <Card
                  data={item}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              )}
              ListEmptyComponent={<Text>No hay datos disponibles</Text>}
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
                { label: 'Credito Fiscal', value: 1 },
                { label: 'Factura Consumidor Final', value: 2 },
                { label: 'Factura Sujeto Excluido', value: 3},
                { label: 'Otro', value: 4 },
              ]}
              selectedValue={form.tipo_servicio}
              onValueChange={(value) => setForm({ ...form, tipo_servicio: value })}
            />
            <ComboBox
              placeHolder='Servicio'
              options={servicios.map(service => ({
                label: service.nombre_servicio,
                value: service.id_servicio
              }))}
              selectedValue={form.id_servicio}
              onValueChange={(value) => handleServiceChange(value)}
            />
            <ComboBox
              placeHolder='Cliente'
              options={clientes.map(client => ({
                label: client.nombre_cliente,
                value: client.id_cliente
              }))}
              selectedValue={form.id_cliente}
              onValueChange={(value) => handleClientChange(value)}
            />
            <Input
              placeHolder='Monto'
              setValor={form.monto}
              setTextChange={(text) => setForm({ ...form, monto: text })}
              keyboardType='numeric'
            />
            <Input
              placeHolder='Fecha Emisión'
              setValor={form.fecha_emision}
              setTextChange={(text) => setForm({ ...form, fecha_emision: text })}
              keyboardType='datetime'
            />
            <Buttons textoBoton={view === 'create' ? 'Crear' : 'Actualizar'} accionBoton={view === 'create' ? handleCreate : handleUpdate} />
            <Buttons textoBoton="Cancelar" accionBoton={() => setView('list')} />
          </ScrollView>
        );
      default:
        return <View><Text>Vista no encontrada</Text></View>;
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
  formContainer: {
    flex: 1,
    padding: 20,
  },
  texto: {
    fontSize: 20,
    marginBottom: 20,
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
});

export default App;
