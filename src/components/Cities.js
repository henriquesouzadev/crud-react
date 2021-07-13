import React from 'react'

const Cities = () => {

   const [city, setCity] = React.useState('');
   const [state, setState] = React.useState('');
   const [alert, setAlert] = React.useState([]);
   const [listStates, setListStates] = React.useState([]);
   const [listCities, setListCities] = React.useState([]);

   React.useEffect(async () => {
      let response = await fetch('http://localhost:3001/states', { method: 'GET' });
      let json = await response.json();
      setListStates(json)
   }, []);

   React.useEffect(async () => {
      let response = await fetch('http://localhost:3001/cities', { method: 'GET' });
      let json = await response.json();
      setListCities(json)
   }, [alert]);

   const handleSubmitCity = async (e) => {
      e.preventDefault();

      const data = {
         "name": city,
         "nameState": state
      }
      const regex = /[^a-zA-Z\wÀ-ú ]/g;
      console.log(regex.test(city))

      try {
         if (regex.test(city) === false) throw new Error('Preencha um nome válido');
         if (!city) throw new Error('Preencha a cidade');
         if (!state) throw new Error('Selecione o estado');

         let response = await fetch('http://localhost:3001/cities', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
         });
         let json = await response.json();
         json.name !== '' && setAlert({ status: "ok", message: "Cadastrado com sucesso!" });
      } catch (e) {
         setAlert({ status: "error", message: e.message });
      }
   }

   const handleDelete = async (id) => {
      try {
         let response = await fetch(`http://localhost:3001/cities/${id}`, { method: 'DELETE' });
         let json = await response.json();
         json.name !== '' && setAlert({ status: "ok", message: "Cadastrado com sucesso!" })
      } catch (e) {
         setAlert({ status: "error", message: e.message });
      }
   }

   return (
      <div>

         <form onSubmit={handleSubmitCity}>
            <h3 className="title">Cadastrar Cidade</h3>

            <div className="form-row">
               <div className="form-group">
                  <label htmlFor="city">Cidade:</label>
                  <input
                     type="text"
                     name="city"
                     id="city"
                     value={city}
                     onChange={(event) => setCity(event.target.value)}
                  />
               </div>

               <div className="form-group">
                  <label htmlFor="uf">UF:</label>
                  <select
                     name="state"
                     id="state"
                     value={state}
                     onChange={(event) => setState(event.target.value)}
                  >
                     <option value="">Selecione um estado</option>
                     {listStates && listStates.map(item => <option key={item.id} value={item.name}>{item.name}</option>)}
                  </select>
               </div>
            </div>

            <button type="submit">Salvar</button>
            {alert.status && <div className="alert">{alert.message}</div>}
         </form>

         <div className="list">
            {listCities.map(city => (
               <div key={city.id} className="item">
                  {city.name} - {city.nameState}
                  <button onClick={() => handleDelete(city.id)} className="delete">excluir</button>
               </div>
            ))}
         </div>

      </div>
   )
}

export default Cities
