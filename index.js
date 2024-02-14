const {program} = require("commander");
const contactsOperations = require("./db/contacts");

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();

// TODO: рефакторити
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contacts = await contactsOperations.list();
      console.table(contacts);
      break;

    case "get":
      const contact = await contactsOperations.get(id);
      console.log(contact);
      break;

    case "add":
      const newContact = await contactsOperations.add(name, email, phone);
      console.log(newContact);
      break;

    case "remove":
      const removeContact = await contactsOperations.remove(id);
      console.log(removeContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(options);