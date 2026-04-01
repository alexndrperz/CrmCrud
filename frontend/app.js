const API = 'https://localhost:7024/api/crm';


async function load() {
  const tbody = document.getElementById('tableBody');
  try {
    const res  = await fetch(API);
    const data = await res.json();

    if (data.length === 0) {
      tbody.innerHTML = '<tr><td colspan="6" class="text-center py-4 text-muted">Sin registros aún</td></tr>';
      return;
    }

    tbody.innerHTML = data.map(e => `
      <tr>
        <td>${e.id}</td>
        <td>${e.customerName}</td>
        <td>${e.phone}</td>
        <td>${e.message}</td>
        <td>${new Date(e.createdAt).toLocaleDateString('es-AR')}</td>
        <td>
          <button class="btn btn-sm btn-outline-secondary me-1" onclick="edit(${e.id})">Editar</button>
          <button class="btn btn-sm btn-outline-danger"          onclick="remove(${e.id})">Eliminar</button>
        </td>
      </tr>`).join('');

  } catch {
    tbody.innerHTML = '<tr><td colspan="6" class="text-center py-4 text-danger">No se pudo conectar con la API</td></tr>';
  }
}