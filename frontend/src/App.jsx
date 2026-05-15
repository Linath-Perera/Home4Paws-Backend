import { useEffect, useState } from 'react'
import axios from 'axios'

function App() {
  const [pets, setPets] = useState([])
  const [formData, setFormData] = useState({ name: '', breed: '', age: '', gender: 'Male', description: '' })

  
  const fetchPets = () => {
    axios.get('http://localhost:5000/api/pets')
      .then(res => setPets(res.data))
      .catch(err => console.log("Error fetching pets:", err))
  }

  
  useEffect(() => { 
    fetchPets() 
  }, [])

  
  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post('http://localhost:5000/api/pets', formData)
      .then(() => {
        fetchPets() 
        alert("Pet Added Successfully! 🐾")
        setFormData({ name: '', breed: '', age: '', gender: 'Male', description: '' }) 
      })
      .catch(err => console.log("Error adding pet:", err))
  }

  return (
    <div style={{ padding: '40px', backgroundColor: '#f0f2f5', minHeight: '100vh', fontFamily: 'Segoe UI' }}>
      <h1 style={{ textAlign: 'center', color: '#1e3799' }}>🏠 Home4Paws Admin Dashboard</h1>
      
      
      <div style={{ maxWidth: '500px', margin: '0 auto', backgroundColor: 'white', padding: '20px', borderRadius: '15px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
        <h3 style={{ textAlign: 'center' }}>Add New Pet</h3>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <input style={{ padding: '12px', borderRadius: '5px', border: '1px solid #ddd' }} placeholder="Pet Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
          <input style={{ padding: '12px', borderRadius: '5px', border: '1px solid #ddd' }} placeholder="Breed" value={formData.breed} onChange={e => setFormData({...formData, breed: e.target.value})} required />
          <input style={{ padding: '12px', borderRadius: '5px', border: '1px solid #ddd' }} type="number" placeholder="Age" value={formData.age} onChange={e => setFormData({...formData, age: e.target.value})} required />
          <button style={{ padding: '12px', backgroundColor: '#1e3799', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }} type="submit">Save Pet</button>
        </form>
      </div>

      <h3 style={{ marginTop: '40px', textAlign: 'center', color: '#333' }}>Available Pets</h3>
      
      
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
        {pets.length > 0 ? (
          pets.map(pet => (
            <div key={pet._id} style={{ backgroundColor: 'white', padding: '20px', borderRadius: '15px', width: '220px', boxShadow: '0 4px 10px rgba(0,0,0,0.08)', borderTop: '5px solid #1e3799' }}>
              <h2 style={{ color: '#eb4d4b', margin: '0 0 10px 0', textTransform: 'capitalize' }}>{pet.name}</h2>
              <p style={{ margin: '5px 0' }}><b>Breed:</b> {pet.breed}</p>
              <p style={{ margin: '5px 0' }}><b>Age:</b> {pet.age} Years</p>
              <p style={{ margin: '5px 0' }}><b>Status:</b> <span style={{ color: '#2ecc71', fontWeight: 'bold' }}>{pet.status || 'Available'}</span></p>
            </div>
          ))
        ) : (
          <p style={{ color: '#777' }}>No pets found. Add a new pet to see it here!</p>
        )}
      </div>
    </div>
  )
}

export default App