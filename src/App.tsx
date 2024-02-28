import { useEffect, useState } from 'react'
import { FiTrash } from 'react-icons/fi'
import { api } from './services/api'

interface CustomerProps {
  id: string;
  name: string;
  email: string;
  status: boolean;
  created_at: string;
}

export default function App() {

  const [customers, setCustomers] = useState<CustomerProps[]>([])

  useEffect(() => {
    loadCustomers();
  }, [])

  async function loadCustomers() {
    const response = await api.get('/customers')
    setCustomers(response.data)
  }

  return (
    <div className="w-full min-h-screen bg-gray-900 flex justify-center px-4">
      <main className="my-10 w-full md:max-w-2x1">
        <h1 className="text-4x1 font-medium text-white">Clientes</h1>

        <form className="flex flex-col my-6">
          <label className="font-medium text-white">Name:</label>
          <input
            className="w-full mb-5 p-2 rounded"
            type="text"
            placeholder="Digite seu nome completo..."
          />

          <label className="font-medium text-white">E-mail:</label>
          <input
            className="w-full mb-5 p-2 rounded"
            type="email"
            placeholder="Digite seu e-mail..."
          />

          <input type="submit" value="Cadastrar"
            className="cursor-pointer w-full p-2 bg-green-500 rounded font-medium text-white" />
        </form>

        <section className="flex flex-col gap-4">

          {customers.map( (customer) => (
            <article
            key={customer.id}
              className="w-full bg-white rounded p-2 relative hover:scale-105 duration-200">
              <p><span className="font-medium">Nome:</span> {customer.name} </p>
              <p><span className="font-medium">E-mail:</span> {customer.email} </p>
              <p><span className="font-medium">Status:</span> {customer.status ? "ATIVO" : "INATIVO"} </p>

              <button
                className='bg-red-500 w-7 h-7 flex items-center justify-center rounded-lg absolute right-0 -top-2'>
                <FiTrash size={18} color="#FFF" />
              </button>

            </article>
          ))}

        </section>

      </main>
    </div>
  )
}