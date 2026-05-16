import { useEffect, useState } from 'react'
import axios from 'axios'

function App() {
  const [pets, setPets] = useState([])
  const [formData, setFormData] = useState({ name: '', breed: '', age: '' })

  
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
    
    const petData = { 
      name: formData.name, 
      breed: formData.breed, 
      age: Number(formData.age),
      gender: 'Male',
      status: 'Available',
      description: ''
    }

    axios.post('http://localhost:5000/api/pets', petData)
      .then(() => {
        fetchPets() 
        alert("Pet Added Successfully! 🐾")
        setFormData({ name: '', breed: '', age: '' }) 
      })
      .catch(err => console.log("Error adding pet:", err))
  }

  
  const handleDelete = (id) => {
    if(window.confirm("Are you sure you want to remove this pet?")) {
      axios.delete(`http://localhost:5000/api/pets/${id}`)
        .then(() => {
          fetchPets() 
        })
        .catch(err => console.log("Error deleting pet:", err))
    }
  }

  
  const toggleStatus = (id, currentStatus) => {
    const newStatus = currentStatus === 'Available' ? 'Adopted' : 'Available';
    axios.put(`http://localhost:5000/api/pets/${id}`, { status: newStatus })
      .then(() => {
        fetchPets() 
      })
      .catch(err => console.log("Error updating status:", err))
  }

  return (
    <div style={{ padding: '40px 20px', backgroundColor: '#f5f7fa', minHeight: '100vh', fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
      
      
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ color: '#1e3799', margin: '0', fontSize: '2.5rem', fontWeight: '700' }}>
          🏠 Home4Paws Admin Dashboard
        </h1>
        <p style={{ color: '#7f8c8d', marginTop: '5px' }}>Manage shelter pets and adoption status</p>
      </div>
      
      
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: '30px', justifyContent: 'center' }}>
        
        
        <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', width: '350px', height: 'fit-content' }}>
          <h3 style={{ margin: '0 0 20px 0', color: '#34495e', textAlign: 'center' }}>Add New Pet</h3>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', color: '#7f8c8d', fontSize: '0.9rem' }}>Pet Name</label>
              <input style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #dcdde1', boxSizing: 'border-box' }} placeholder="e.g. Tommy" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', color: '#7f8c8d', fontSize: '0.9rem' }}>Breed</label>
              <input style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #dcdde1', boxSizing: 'border-box' }} placeholder="e.g. Labrador" value={formData.breed} onChange={e => setFormData({...formData, breed: e.target.value})} required />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', color: '#7f8c8d', fontSize: '0.9rem' }}>Age (Years)</label>
              <input style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #dcdde1', boxSizing: 'border-box' }} type="number" placeholder="e.g. 2" value={formData.age} onChange={e => setFormData({...formData, age: e.target.value})} required />
            </div>
            <button style={{ padding: '14px', backgroundColor: '#1e3799', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem', marginTop: '10px' }} type="submit">✨ Save Pet To Shelter</button>
          </form>
        </div>

        
        <div style={{ flex: '1', minWidth: '300px' }}>
          <h3 style={{ margin: '0 0 20px 0', color: '#34495e' }}>Registered Pets ({pets.length})</h3>
          
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            {pets.length > 0 ? (
              pets.map(pet => (
                <div key={pet._id} style={{ backgroundColor: 'white', padding: '25px', borderRadius: '16px', width: '220px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', position: 'relative', borderTop: pet.status === 'Available' ? '6px solid #2ecc71' : '6px solid #95a5a6' }}>
                  
                  
                  <button onClick={() => handleDelete(pet._id)} style={{ position: 'absolute', top: '15px', right: '15px', background: 'none', border: 'none', color: '#e74c3c', fontSize: '1.2rem', cursor: 'pointer' }} title="Delete Pet">🗑️</button>

                  <h2 style={{ color: '#2c3e50', margin: '0 0 15px 0', textTransform: 'capitalize', fontSize: '1.4rem' }}>{pet.name}</h2>
                  <p style={{ margin: '8px 0', color: '#57606f', fontSize: '0.95rem' }}><b>Breed:</b> {pet.breed}</p>
                  <p style={{ margin: '8px 0', color: '#57606f', fontSize: '0.95rem' }}><b>Age:</b> {pet.age} Years</p>
                  
                  <p style={{ margin: '15px 0 20px 0', color: '#57606f', fontSize: '0.95rem' }}>
                    <b>Status:</b> <span style={{ padding: '4px 8px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold', backgroundColor: pet.status === 'Available' ? '#e1f5fe' : '#f5f5f5', color: pet.status === 'Available' ? '#0288d1' : '#616161' }}>{pet.status || 'Available'}</span>
                  </p>

                  
                  <button onClick={() => toggleStatus(pet._id, pet.status)} style={{ width: '100%', padding: '10px', backgroundColor: pet.status === 'Available' ? '#2ecc71' : '#7f8c8d', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', fontSize: '0.85rem' }}>
                    {pet.status === 'Available' ? '✓ Mark as Adopted' : '↺ Make Available'}
                  </button>

                </div>
              ))
            ) : (
              <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '16px', width: '100%', textAlign: 'center', color: '#7f8c8d' }}>
                <p style={{ margin: '0' }}>No pets found in the shelter database.</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  )
}

export default App