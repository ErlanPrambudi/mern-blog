import { Modal, Table, Button } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { HiOutlineExclamationCircle } from "react-icons/hi";

const DashManagement = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [userManagement, setUserManagement] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [managementIdToDelete, setManagementIdToDelete] = useState("");
  console.log(userManagement);
  useEffect(() => {
    const fetchManagement = async () => {
      try {
        const res = await fetch(`/api/management/getmanagements?userId=${currentUser._id}`);
        const data = await res.json();

        if (res.ok) {
          setUserManagement(data.managements);
          if (data.managements.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (currentUser.isAdmin) {
      fetchManagement();
    }
  }, [currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = userManagement.length;
    try {
      const res = await fetch(`/api/managements/getmanagements?userId=${currentUser._id}&startIndex=${startIndex}`);
      const data = await res.json();
      if (res.ok) {
        setUserManagement((prev) => [...prev, ...data.managements]);
        if (data.managements.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteManagement = async () => {
    setShowModal(false);
    try {
      const res = await fetch(`/api/management/deletemanagement/${managementIdToDelete}/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        setUserManagement((prev) => prev.filter((management) => management._id !== managementIdToDelete));
      }
    } catch (error) {}
  };

  return (
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500 ">
      {currentUser.isAdmin && userManagement.length > 0 ? (
        <>
          <Table hoverable className="shadow-md">
            <Table.Head>
              <Table.HeadCell>Date Update</Table.HeadCell>
              <Table.HeadCell>Managements image</Table.HeadCell>
              <Table.HeadCell>INSTITUTION NAME</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
              <Table.HeadCell>
                <span>Edit</span>
              </Table.HeadCell>
            </Table.Head>
            {userManagement.map((management) => (
              <Table.Body className="divide-y">
                <Table.Row className=" bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell>{new Date(management.updatedAt).toLocaleDateString()}</Table.Cell>
                  <Table.Cell>
                    <Link to={`/management/${management.slug}`}>
                      <img src={management.image} alt={management.namaLembaga} className="w-20 h-10 object-cover bg-gray-500" />
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                    <Link className="font-medium text-gray-900 dark:text-white" to={`/management/${management.slug}`}>
                      {management.namaLembaga}
                    </Link>
                  </Table.Cell>

                  <Table.Cell>
                    <span
                      onClick={() => {
                        setShowModal(true);
                        setManagementIdToDelete(management._id);
                      }}
                      className="font-md text-red-500 hover:underline cursor-pointer"
                    >
                      Delete
                    </span>
                  </Table.Cell>

                  <Table.Cell>
                    <Link className="text-teal-500 hover:underline" to={`/update-management/${management._id}`}>
                      <span>Edit</span>
                    </Link>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
          {showMore && (
            <button onClick={handleShowMore} className="w-full text-teal-500 self-center text-sm py-7">
              Show more
            </button>
          )}
        </>
      ) : (
        <p>You have no management yet!</p>
      )}
      <Modal show={showModal} onClose={() => setShowModal(false)} popup size="md">
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">Are you sure you want to deleted this management ?</h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeleteManagement}>
                Yes, I'am sure
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default DashManagement;
