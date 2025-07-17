

function UsersList() {

  return (
    <div className="flex-1">
      <div className="border border-black rounded-[10px] p-6 min-h-[736px]">
        <h1 className="text-[20px] font-bold text-black text-center mb-6">
          Users List
        </h1>
        <ListTable
          headers={['ID', 'Name', 'Image', 'Category', 'Branch Name', 'Balance', 'Status']}
          rowDataKeys={['id', 'name', 'image', 'category', 'BranchName', 'balance', 'status']}
          module="riders"
          searchableFields={['name', 'category', 'status', 'BranchName']}
          buttons={tabButtons}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

      </div>
    </div>
  );
};

export default UsersList;
