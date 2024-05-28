import React from 'react';
//mock component for office inventory currently disabled (not in use)
const OfficeInventory = () => {
  return (
    <section className="inventory-section max-w-4xl mx-auto">
      <h3 className="text-xl font-bold mb-4">Office Inventory</h3>
      <table className="inventory-table w-full">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="px-4 py-2">Department</th>
            <th className="px-4 py-2">Inventory Items</th>
            <th className="px-4 py-2">Quantity</th>
            <th className="px-4 py-2">Status</th> 
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="px-4 py-2">Software Engineering Department</td>
            <td className="px-4 py-2">Laptops</td>
            <td className="px-4 py-2">15</td>
            <td className="px-4 py-2">In Stock</td> 
          </tr>
          <tr>
            <td className="px-4 py-2">Industial Egineering Department</td>
            <td className="px-4 py-2">Desks</td>
            <td className="px-4 py-2">20</td>
            <td className="px-4 py-2">Pending Delivery</td> 
          </tr>
          <tr>
            <td className="px-4 py-2">Biomedical Egineering Department</td>
            <td className="px-4 py-2">Chairs</td>
            <td className="px-4 py-2">25</td>
            <td className="px-4 py-2">In Stock</td> 
          </tr>
          <tr>
            <td className="px-4 py-2">Mechanical Engineering Department</td>
            <td className="px-4 py-2">3D Printers</td>
            <td className="px-4 py-2">5</td>
            <td className="px-4 py-2">Maintenance Required</td>
          </tr>
          <tr>
            <td className="px-4 py-2">Electrical Engineering Department</td>
            <td className="px-4 py-2">Oscilloscopes</td>
            <td className="px-4 py-2">10</td>
            <td className="px-4 py-2">In Stock</td>
          </tr>
          <tr>
            <td className="px-4 py-2">Civil Engineering Department</td>
            <td className="px-4 py-2">Concrete Mixers</td>
            <td className="px-4 py-2">8</td>
            <td className="px-4 py-2">In Stock</td>
          </tr>
         



        </tbody>
      </table>
    </section>
  );
};

export default OfficeInventory;