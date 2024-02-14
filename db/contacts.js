const fs = require('fs').promises;
const path = require('path');
const { v4 } = require('uuid');

const filePath = path.join(__dirname, 'contacts.json');

const list = async () => {
    const data = await fs.readFile(filePath);
    const contacts = JSON.parse(data);
    return contacts;
}

const get = async (id) => {
    const allContacts = await list();
    const contact = allContacts.find((c) => c.id === id);
    if (!contact) {return null};
    return contact;
}

const add = async (name, email, phone) => {
    const contacts = await list();
    const newContact = { id: v4(), name, email, phone };
    const newData = JSON.stringify([...contacts, newContact], null, 2);
    await fs.writeFile(filePath, newData);
    return newContact;
}

const remove = async (id) => {
    const contacts = await list();
    const idx = contacts.findIndex((c) => c.id === id);
    if (idx === -1) {
        return null;
    };
    const [removeContact] = contacts.splice(idx, 1);
    await fs.writeFile(filePath, JSON.stringify(contacts, null, 2));
    return removeContact;
}

module.exports = {
    list,
    get,
    add,
    remove
};