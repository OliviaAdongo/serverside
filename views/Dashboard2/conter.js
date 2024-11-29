<script>
const apiUrl = 'http://localhost:3000/api/lands'; // Replace with your backend endpoint

// Fetch and display land properties
const fetchLands = async () => {
    try {
        const response = await axios.get(apiUrl);
        const lands = response.data;
        const tableBody = document.getElementById('landTable');
        tableBody.innerHTML = '';

        lands.forEach(land => {
            const row = `<tr>
                <td>${land.location}</td>
                <td>${land.price}</td>
                <td>${land.category}</td>
                <td>${land.status}</td>
                <td>${land.availability}</td>
                <td>${land.description}</td>
                <td>
                    ${land.images.map(image => `<img src="${image}" alt="Land Image" class="img-thumbnail" style="width: 100px; height: 100px;">`).join('')}
                </td>
                <td>
                    <button class="btn btn-sm btn-warning" onclick="editLand('${land._id}')">Edit</button>
                    <button class="btn btn-sm btn-danger" onclick="deleteLand('${land._id}')">Delete</button>
                </td>
            </tr>`;
            tableBody.innerHTML += row;
        });
    } catch (error) {
        console.error('Error fetching land properties:', error);
    }
};

// Add or update land
document.getElementById('landForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const landId = document.getElementById('landId').value;
    const landData = {
        location: document.getElementById('location').value,
        price: document.getElementById('price').value,
        category: document.getElementById('category').value,
        status: document.getElementById('status').value,
        availability: document.getElementById('availability').value,
        description: document.getElementById('description').value,
        images: document.getElementById('images').value.split(','),
    };

    try {
        if (landId) {
            await axios.put(`${apiUrl}/${landId}`, landData);
        } else {
            await axios.post(apiUrl, landData);
        }

        document.getElementById('landForm').reset();
        fetchLands();
    } catch (error) {
        console.error('Error saving land:', error);
    }
});

// Edit land
const editLand = async (id) => {
    try {
        const response = await axios.get(`${apiUrl}/${id}`);
        const land = response.data;

        document.getElementById('landId').value = land._id;
        document.getElementById('location').value = land.location;
        document.getElementById('price').value = land.price;
        document.getElementById('category').value = land.category;
        document.getElementById('status').value = land.status;
        document.getElementById('availability').value = land.availability;
        document.getElementById('description').value = land.description;
        document.getElementById('images').value = land.images.join(',');
    } catch (error) {
        console.error('Error fetching land:', error);
    }
};

// Delete land
const deleteLand = async (id) => {
    try {
        await axios.delete(`${apiUrl}/${id}`);
        fetchLands();
    } catch (error) {
        console.error('Error deleting land:', error);
    }
};

// Reset form
document.getElementById('resetForm').addEventListener('click', () => {
    document.getElementById('landForm').reset();
    document.getElementById('landId').value = '';
});

// Initial fetch
fetchLands();
</script>