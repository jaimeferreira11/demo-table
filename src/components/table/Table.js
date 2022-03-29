import React, { useEffect, useMemo, useState, useCallback } from 'react'
import DataTable from 'react-data-table-component';
import axios from "axios";
import FilterComponent from './FilterComponent';
import Modal from 'react-modal';


const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

export const Table = () => {

  const [data, setData] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterText, setFilterText] = useState('');
  const [formValues, setFormValues] = useState({firstName:"", lastName:"", email: ""});
  const { firstName , lastName, email} = formValues;
  const [modalIsOpen, setIsOpen] = React.useState(false);
  

  const handleSubmitForm = (e) => {
    e.preventDefault();
    if(firstName.trim().length < 2){

      alert("El nombre debe tener al menos 3 caracteres")
      return ;
    }
    setFilteredItems( [ {first_name: firstName, last_name: lastName, email: email}, ...filteredItems ]);
    closeModal();
    setTimeout(() => {
      alert('Registro guardado')
    }, 100);

  }

  const handleInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value
    })
    console.log(formValues);
  }


  const removeItem = (array, item) => {
    const newArray = array.slice();
    newArray.splice(newArray.findIndex(a => a === item), 1);
  
    return newArray;
  };
  
  const handlePageChange = page => {
    fetchUsers(page);
    setCurrentPage(page);
  };

  const handlePerRowsChange = async (newPerPage, page) => {
    fetchUsers(page, newPerPage);
    setPerPage(newPerPage);
  };

  const handleDelete = useCallback(
    row => async () => {
      
      setFilteredItems(removeItem(data, row));
      setTotalRows(totalRows - 1);
      alert('Regitro eliminado');
    },
    [totalRows, data]
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    let rand = Math.random();
    rand = Math.floor( rand * 2-1);
    rand = rand + 2;

    console.log(rand);
    fetchUsers(rand);
  }

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
    setFormValues({firstName:"", lastName:"", email: ""});
  }

  const fetchUsers = async (page, size = perPage) => {
    setLoading(true);

    const response = await axios.get(
      `https://reqres.in/api/users?page=${page}&per_page=${size}&delay=1`
    );

    setData(response.data.data);
    setFilteredItems(response.data.data);
    setTotalRows(response.data.total);
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers(1);
  }, []);


  const columns = useMemo(
    () => [
      {
        name: "First Name",
        selector: row => row.first_name,
        sortable: true
      },
      {
        name: "Last Name",
        selector: row => row.last_name,
        sortable: true
      },
      {
        name: "Email",
        selector: row => row.email,
        sortable: true
      },
      {
        cell: row => <button  className="btn btn-danger" onClick={handleDelete(row)}> Delete</button>
      }
    ],
    [handleDelete]
  );


  const subHeaderComponentMemo = React.useMemo(() => {
		const handleClear = () => {
			if (filterText) {
				setFilteredItems(data);
				setFilterText('');
			}
		};

    const handleInput = (e) =>{
      setFilterText(e.target.value);

      console.log(e.target.value);
      console.log(data);
      const filter = data.filter(
        item => (item.first_name && item.first_name.toLowerCase().includes(e.target.value.toLowerCase()))
         || (item.last_name && item.last_name.toLowerCase().includes(e.target.value.toLowerCase())),
      );

      setFilteredItems(filter);
    }

		return (
			<FilterComponent onFilter={handleInput} onClear={handleClear} filterText={filterText} />
		);
	}, [filterText, setFilteredItems, data ]);

 

  return (
    <>
    <div className="col-sm-12">
                <div className="card">
                  <div className="card-header">
                    <h5>Lista de usuarios</h5>
                    <span>Los datos son proveidos desde el API. <code>https://reqres.in/api/users</code>  </span>
                  </div>
                  <div className="card-body">
                    <form onSubmit={handleSubmit}>

                        <div className='row '>
                          
                              <div className="col-sm-3">
                                    <button className='ms-1 btn btn-success' type="button" onClick={openModal}> Nuevo registro</button>
                                </div>
                                <div className="col-sm-3">
                                  <div class="input-group"><span class="input-group-text">Desde</span>
                                  <input class="form-control" type="date" placeholder="dd/mm/aaa"  required/>
                                  </div>
                                </div>
                                <div className="col-sm-3">
                                <div class="input-group"><span class="input-group-text">Hasta</span>
                                  <input class="form-control" type="date" placeholder="dd/mm/aaa" required/>
                                </div>
                                </div>
                                <div className="col-sm-3">
                                <button className='btn btn-primary' type="submit" > Filtrar</button>
                                <button className='ms-1 btn btn-info' type="submit" > Reset</button>
                                </div>
                                
                        </div>
                    </form>

                    <div className="table-responsive">
                
                    <DataTable
                          columns={columns}
                          data={filteredItems}
                          progressPending={loading}
                          pagination
                          paginationServer
                          paginationTotalRows={totalRows}
                          paginationDefaultPage={currentPage}
                          onChangeRowsPerPage={handlePerRowsChange}
                          onChangePage={handlePageChange}
                          striped
                          selectableRows
                          onSelectedRowsChange={({ selectedRows }) => console.log(selectedRows)}
                          subHeader
			                    subHeaderComponent={subHeaderComponentMemo}
                         
                        />
                         <div>
    
                        <Modal
                          isOpen={modalIsOpen}
                          // onAfterOpen={afterOpenModal}
                          onRequestClose={closeModal}
                          style={customStyles}
                          contentLabel="Example Modal"
                        >
                          <h5>  Nuevo registro </h5>
      <hr />
      <form className="container"
        onSubmit={handleSubmitForm}
      >

          <div className="form-group">
              <label>Nombre</label>
              <input 
                  type="text" 
                  className={`form-control`}
                  placeholder="Nombre del ususario"
                  name="firstName"
                  value={firstName}
                  onChange={handleInputChange}
                  autoComplete="off"
                  required
              />
          </div>

          <div className="form-group">
          <label>Apellido</label>
              <input 
                  type="text" 
                  className={`form-control`}
                  placeholder="Apellido del usuario"
                  name="lastName"
                  value={lastName}
                  onChange={handleInputChange}
                  autoComplete="off"
                  required
              />
          </div>
          <div className="form-group">
          <label>Email</label>
              <input 
                  type="email" 
                  className={`form-control`}
                  placeholder="ejemplo@ejemplo.com"
                  name="email"
                  value={email}
                  onChange={handleInputChange}
                  autoComplete="off"
                  required
              />
          </div>

          <button
              type="button"
              onClick={closeModal}
              className="btn btn-outline-danger me-5"
          >
              <i className="fa fa-times"></i>
              <span> Cancelar</span>
          </button>


          <button
              type="submit"
              className="btn btn-outline-primary btn-block"
          >
              <i className="fa fa-save"></i>
              <span> Guardar</span>
          </button>
         

      </form>
                        </Modal>
    </div>
                    </div>
                  </div>
                </div>
              </div>

             
    </>

  )
}
