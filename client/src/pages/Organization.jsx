import { useEffect, useState } from "react";
import ManagementCard from "../components/ManagementCard";
import { useSelector } from "react-redux";

const Organization = () => {
  const [managements, setManagements] = useState([]); // Gabungkan recentManagement dan userManagement
  const { currentUser } = useSelector((state) => state.user);
  const [showMore, setShowMore] = useState(true);

  // Fetch initial management data on component mount
  useEffect(() => {
    try {
      const fetchManagements = async () => {
        const res = await fetch(`/api/management/getmanagements`);
        const data = await res.json();
        if (res.ok) {
          setManagements(data.managements);
          // Hide "Show more" button if fewer than 9 items are loaded initially
          if (data.managements.length < 9) {
            setShowMore(false);
          }
        }
      };
      fetchManagements();
    } catch (error) {
      console.log(error);
    }
  }, []);

  // Fetch more management data when "Show more" is clicked
  const handleShowMore = async () => {
    const startIndex = managements.length;
    try {
      const res = await fetch(`/api/management/getmanagements?userId=${currentUser._id}&startIndex=${startIndex}`);
      const data = await res.json();
      if (res.ok) {
        setManagements((prev) => [...prev, ...data.managements]);
        // Hide "Show more" if the returned data is less than 9
        if (data.managements.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7">
      {managements.length > 0 && (
        <div className="flex flex-col gap-6">
          <h2 className="text-2xl font-semibold text-center">Recent Organization</h2>
          <div className="flex flex-wrap gap-5 mt-5 justify-center">
            {managements.map((management) => (
              <ManagementCard key={management._id} management={management} />
            ))}
          </div>
        </div>
      )}
      {showMore && (
        <button onClick={handleShowMore} className="w-full text-teal-500 self-center text-sm py-7">
          Show more
        </button>
      )}
    </div>
  );
};

export default Organization;
