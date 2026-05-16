import { useEffect, useState } from 'react'
import axios from 'axios'

function App() {
  const [pets, setPets] = useState([])
  const [formData, setFormData] = useState({ name: '', breed: '', age: '' })
  
  
  const [viewState, setViewState] = useState('selection') 
  const [loginData, setLoginData] = useState({ username: '', password: '' })
  const [loginError, setLoginError] = useState('')

  
  const fetchPets = () => {
    axios.get('http://localhost:5000/api/pets')
      .then(res => setPets(res.data))
      .catch(err => console.log("Error fetching pets:", err))
  }

  useEffect(() => { 
    if (viewState === 'admin_dashboard' || viewState === 'guest_view') {
      fetchPets() 
    }
  }, [viewState])

  
  const handleLogin = (e) => {
    e.preventDefault()
    if (loginData.username === 'admin' && loginData.password === 'admin123') {
      setViewState('admin_dashboard')
      setLoginError('')
    } else {
      setLoginError('Invalid Username or Password! ❌')
    }
  }

  
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
        .then(() => { fetchPets() })
        .catch(err => console.log("Error deleting pet:", err))
    }
  }

  
  const toggleStatus = (id, currentStatus) => {
    const newStatus = currentStatus === 'Available' ? 'Adopted' : 'Available';
    axios.put(`http://localhost:5000/api/pets/${id}`, { status: newStatus })
      .then(() => { fetchPets() })
      .catch(err => console.log("Error updating status:", err))
  }

  
  const handleAdoptRequest = (petName, petId) => {
    
    alert(`🎉 Thank you! Your interest in adopting "${petName}" has been sent to the Admin. We will contact you soon!`);
    
    
    axios.put(`http://localhost:5000/api/pets/${petId}`, { status: 'Requested ⏳' })
      .then(() => { fetchPets() })
      .catch(err => console.log("Error sending request:", err))
  }


  
  if (viewState === 'selection') {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f5f7fa', fontFamily: 'Segoe UI' }}>
        <div style={{ backgroundColor: 'white', padding: '5px 40px 40px 40px', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.08)', width: '400px', textAlign: 'center' }}>
          <h1 style={{ fontSize: '4.5rem', marginBottom: '0' }}>🐾</h1>
          <h2 style={{ color: '#1e3799', margin: '0 0 5px 0', fontSize: '2rem' }}>Home4Paws</h2>
          <p style={{ color: '#7f8c8d', marginBottom: '35px' }}>Please select your portal to continue</p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            
            <button onClick={() => setViewState('guest_view')} style={{ padding: '18px', backgroundColor: '#2ecc71', color: 'white', border: 'none', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1.1rem', boxShadow: '0 4px 10px rgba(46, 204, 113, 0.2)' }}>
              🔍 Enter as Guest (Browse Pets)
            </button>

            
            <button onClick={() => setViewState('admin_login')} style={{ padding: '18px', backgroundColor: '#1e3799', color: 'white', border: 'none', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1.1rem', boxShadow: '0 4px 10px rgba(30, 55, 153, 0.2)' }}>
              🥇 Enter as Admin (Management)
            </button>
          </div>
        </div>
      </div>
    )
  }

  
  if (viewState === 'admin_login') {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f5f7fa', fontFamily: 'Segoe UI' }}>
        <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', width: '350px', textAlign: 'center' }}>
          <h2 style={{ color: '#1e3799', margin: '0 0 5px 0' }}>Admin Verification</h2>
          <p style={{ color: '#7f8c8d', margin: '0 0 25px 0', fontSize: '0.9rem' }}>Enter credentials to access dashboard</p>
          
          {loginError && <p style={{ color: '#e74c3c', fontSize: '0.9rem', fontWeight: 'bold' }}>{loginError}</p>}
          
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <input style={{ padding: '12px', borderRadius: '8px', border: '1px solid #dcdde1', fontSize: '1rem' }} type="text" placeholder="Username" value={loginData.username} onChange={e => setLoginData({...loginData, username: e.target.value})} required />
            <input style={{ padding: '12px', borderRadius: '8px', border: '1px solid #dcdde1', fontSize: '1rem' }} type="password" placeholder="Password" value={loginData.password} onChange={e => setLoginData({...loginData, password: e.target.value})} required />
            <button style={{ padding: '12px', backgroundColor: '#1e3799', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem' }} type="submit">Verify & Login</button>
          </form>
          
          <button onClick={() => setViewState('selection')} style={{ background: 'none', border: 'none', color: '#7f8c8d', marginTop: '20px', cursor: 'pointer', textDecoration: 'underline' }}>
            Back to Main Menu
          </button>
        </div>
      </div>
    )
  }

  
  if (viewState === 'guest_view') {
    return (
      <div style={{ padding: '40px 20px', backgroundColor: '#f5f7fa', minHeight: '100vh', fontFamily: 'Segoe UI' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1000px', margin: '0 auto 40px auto', backgroundColor: 'white', padding: '15px 30px', borderRadius: '12px', boxShadow: '0 4px 10px rgba(0,0,0,0.03)' }}>
          <h2 style={{ color: '#2ecc71', margin: '0' }}>🐶 Home4Paws Adoption Gallery (Guest)</h2>
          <button onClick={() => setViewState('selection')} style={{ padding: '8px 15px', backgroundColor: '#7f8c8d', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>Exit View 🔙</button>
        </div>

        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ display: 'flex', gap: '25px', flexWrap: 'wrap', justifyContent: 'center' }}>
            {pets.length > 0 ? (
              pets.map(pet => (
                <div key={pet._id} style={{ backgroundColor: 'white', padding: '25px', borderRadius: '16px', width: '240px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', borderTop: '6px solid #2ecc71', textAlign: 'center' }}>
                  <h2 style={{ color: '#2c3e50', margin: '0 0 15px 0', textTransform: 'capitalize' }}>{pet.name}</h2>
                  <p style={{ margin: '8px 0', color: '#57606f' }}><b>Breed:</b> {pet.breed}</p>
                  <p style={{ margin: '8px 0', color: '#57606f' }}><b>Age:</b> {pet.age} Years</p>
                  <p style={{ margin: '8px 0', color: '#57606f' }}><b>Status:</b> <span style={{ padding: '3px 8px', borderRadius: '4px', backgroundColor: '#e1f5fe', color: '#0288d1', fontWeight: 'bold', fontSize: '0.85rem' }}>{pet.status || 'Available'}</span></p>
                  
                  
                  {pet.status === 'Available' ? (
                    <button onClick={() => handleAdoptRequest(pet.name, pet.id || pet._id)} style={{ width: '100%', padding: '12px', backgroundColor: '#e74c3c', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', marginTop: '15px' }}>
                      ❤️ I Want to Adopt!
                    </button>
                  ) : (
                    <div style={{ marginTop: '20px', color: '#7f8c8d', fontWeight: 'bold', fontSize: '0.9rem' }}>🔒 Processing Request</div>
                  )}
                </div>
              ))
            ) : (
              <p style={{ color: '#7f8c8d' }}>No pets available for adoption right now.</p>
            )}
          </div>
        </div>
      </div>
    )
  }

  
  return (
    <div style={{ padding: '40px 20px', backgroundColor: '#f5f7fa', minHeight: '100vh', fontFamily: 'Segoe UI' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1200px', margin: '0 auto 40px auto', backgroundColor: 'white', padding: '15px 30px', borderRadius: '12px', boxShadow: '0 4px 10px rgba(0,0,0,0.03)' }}>
        <h2 style={{ color: '#1e3799', margin: '0' }}>🥇 Home4Paws Admin Central</h2>
        <button onClick={() => setViewState('selection')} style={{ padding: '8px 15px', backgroundColor: '#e74c3c', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>Logout 🚪</button>
      </div>
      
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: '30px', justifyContent: 'center' }}>
        
        <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', width: '350px', height: 'fit-content' }}>
          <h3 style={{ margin: '0 0 20px 0', color: '#34495e', textAlign: 'center' }}>Add New Pet</h3>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <input style={{ padding: '12px', borderRadius: '8px', border: '1px solid #dcdde1' }} placeholder="Pet Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
            <input style={{ padding: '12px', borderRadius: '8px', border: '1px solid #dcdde1' }} placeholder="Breed" value={formData.breed} onChange={e => setFormData({...formData, breed: e.target.value})} required />
            <input style={{ padding: '12px', borderRadius: '8px', border: '1px solid #dcdde1' }} type="number" placeholder="Age" value={formData.age} onChange={e => setFormData({...formData, age: e.target.value})} required />
            <button style={{ padding: '14px', backgroundColor: '#1e3799', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }} type="submit">✨ Save Pet</button>
          </form>
        </div>

        
        <div style={{ flex: '1', minWidth: '300px' }}>
          <h3 style={{ margin: '0 0 20px 0', color: '#34495e' }}>All Registered Pets ({pets.length})</h3>
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            {pets.map(pet => (
              <div key={pet._id} style={{ backgroundColor: 'white', padding: '25px', borderRadius: '16px', width: '220px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', position: 'relative', borderTop: pet.status === 'Available' ? '6px solid #2ecc71' : '6px solid #95a5a6' }}>
                <button onClick={() => handleDelete(pet._id)} style={{ position: 'absolute', top: '15px', right: '15px', background: 'none', border: 'none', color: '#e74c3c', fontSize: '1.2rem', cursor: 'pointer' }}>🗑️</button>
                <h2 style={{ color: '#2c3e50', margin: '0 0 15px 0', textTransform: 'capitalize' }}>{pet.name}</h2>
                <p style={{ margin: '8px 0' }}><b>Breed:</b> {pet.breed}</p>
                <p style={{ margin: '8px 0' }}><b>Age:</b> {pet.age} Yrs</p>
                <p style={{ margin: '8px 0' }}><b>Status:</b> <span style={{ fontWeight: 'bold', color: pet.status === 'Available' ? '#2ecc71' : '#f39c12' }}>{pet.status || 'Available'}</span></p>
                
                <button onClick={() => toggleStatus(pet._id, pet.status)} style={{ width: '100%', padding: '10px', backgroundColor: '#34495e', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem', marginTop: '10px' }}>
                  Toggle Status
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App