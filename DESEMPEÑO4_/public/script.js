const API_URL = '/clients';
let editing = false;
let currentId = null;

// Obtener y mostrar usuarios
async function getClients() {
    try {
        const res = await fetch(API_URL);
        const clients = await res.json();

        const table = document.getElementById('userTable');
        table.innerHTML = '';

        clients.forEach(client => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${client.client_id}</td>
                <td>${client.full_name}</td>
                <td>${client.email}</td>
                <td>${client.phone || ''}</td>
                <td>
                    <button onclick="editClient(${client.client_id})">Editar</button>
                    <button onclick="deleteClient(${client.client_id})">Eliminar</button>
                </td>
            `;
            table.appendChild(row);
        });
    } catch (err) {
        console.error('Error al obtener usuarios:', err);
    }
}

// Agregar o actualizar usuario
async function addClient(e) {
    e.preventDefault();

    const client_id = document.getElementById('client_id').value;
    const full_name = document.getElementById('full_name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;

    const method = editing ? 'PUT' : 'POST';
    const url = editing ? `${API_URL}/${currentId}` : API_URL;

    const bodyData = editing
        ? { full_name, email, phone }
        : { client_id: Number(client_id), full_name, email, phone };

    try {
        await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bodyData)
        });

        editing = false;
        currentId = null;
        document.getElementById('userForm').reset();
        getClients();
    } catch (err) {
        console.error('Error al guardar usuario:', err);
    }
}

// Editar usuario
async function editClient(client_id) {
    try {
        const res = await fetch(`${API_URL}/${client_id}`);
        const client = await res.json();

        document.getElementById('client_id').value = client.client_id;
        document.getElementById('full_name').value = client.full_name;
        document.getElementById('email').value = client.email;
        document.getElementById('phone').value = client.phone || '';

        editing = true;
        currentId = client_id;
    } catch (err) {
        console.error('Error al cargar usuario:', err);
    }
}

// Eliminar usuario
async function deleteClient(client_id) {
    try {
        await fetch(`${API_URL}/${client_id}`, { method: 'DELETE' });
        getClients();
    } catch (err) {
        console.error('Error al eliminar usuario:', err);
    }
}

// Eventos
document.getElementById('userForm').addEventListener('submit', addClient);

// Cargar usuarios al inicio
getClients();
