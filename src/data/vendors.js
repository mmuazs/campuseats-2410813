const vendors = [
    {
        id: 'kafe-ali',
        name: 'Kafe Mahallah Ali',
        location: 'Mahallah Ali, Ground Floor',
        openHours: '7:00 am - 10:00 pm',
        isOpen: true,
        menu: [
        { id: 'ali-1', name: 'Nasi Kerabu', description: 'blue rice, ulam, sambal, budu', price: 7.5, category: 'Rice',
        available: true },
        { id: 'ali-2', name: 'Mee Goreng', description: 'mamak-style noodles', price: 6, category:
        'Noodles', available: true },
        { id: 'ali-3', name: 'Extra Joss Anggur', description: 'Powdered energy drink', price: 2.5, category:
        'Drinks', available: false },
        ],
    },
    {
        id: 'kafe-aminah',
        name: 'Kafe Mahallah Aminah',
        location: 'Mahallah Aminah, Ground Floor',
        openHours: '8:00 am - 9:00 pm',
        isOpen: true,
        menu: [
            { id: 'ami-1', name: 'Nasi Ayam Penyet', description: 'Smashed fried chicken with sambal and rice', price: 9, category: 'Rice', available: true },
            { id: 'ami-2', name: 'Air Bandung', description: 'Rose syrup with milk', price:
            3, category: 'Drinks', available: true },
        ],
    },
]
export default vendors