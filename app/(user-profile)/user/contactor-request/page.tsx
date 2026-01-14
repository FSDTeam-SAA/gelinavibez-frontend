// app/contractors/page.tsx

import ContractorTable from "./_components/MyContractorsTable";




export default function ContractorsPage() {
  return (
    <div className="container mx-auto py-10 ">
      <h1 className="text-xl lg:text-3xl font-bold mb-8">Contractor Services Request</h1>
      <ContractorTable />
    </div>
  );
}