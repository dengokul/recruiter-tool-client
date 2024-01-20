import { useEffect, useState, lazy } from "react";
import Layout from "components/layout/Layout";
import candidateService from "services/candidate";
import { CandidateDataT } from "interfaces";
import { useModal } from "contexts/ModalContextProvider";
import Spinner from "components/Spinner";
import { Link } from "react-router-dom";

const DeleteModal = lazy(() => import("components/modals/DeleteModal"));

export default function Classrooms() {
  const { GetCandidates, DeleteCandidate } = candidateService();
  const [loading, setLoading] = useState(false);
  const [candidateData, setCandidateData] = useState<CandidateDataT>([]);
  const {
    isDeleteModal,
    openDeleteModal,
    closeDeleteModal,
    deleteModalData,
  } = useModal();

  useEffect(() => {
    getCandidates();
    // eslint-disable-next-line
  }, []);

  const getCandidates = async () => {
    setLoading(true);
    const classroomsResData = await GetCandidates({});
    setCandidateData(classroomsResData);
    setLoading(false);
  };

  const deleteIt = async () => {
    if (deleteModalData) {
      DeleteCandidate(deleteModalData)
        .then(() => {
          closeDeleteModal();
          getCandidates();
        })
        .catch(() => {
          closeDeleteModal()
        });
    }
  };

  return (
    <Layout>
      <div className="pt-20">

        {isDeleteModal && <DeleteModal deleteIt={deleteIt} />}

        <div className="mx-w-96 mx-2 p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
          <h5 className="my-4 text-3xl font-bold text-gray-900 dark:text-white">Candidate List</h5>

          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-600">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Phone Number
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Qualification
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Expected Salary
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Computed Score
                  </th>
                  <th scope="col" className="px-6 py-3">

                  </th>
                </tr>
              </thead>
              <tbody>
                {
                  candidateData && candidateData.length > 0 ?
                    candidateData.map((item) => {
                      return (
                        <tr key={item.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-gray-900">
                          <td className="px-6 py-4">
                            {item.name}
                          </td>
                          <td className="px-6 py-4">
                            {item.email}
                          </td>
                          <td className="px-6 py-4">
                            {item.phoneNumber}
                          </td>
                          <td className="px-6 py-4">
                            {item.qualifications}
                          </td>
                          <td className="px-6 py-4">
                            {item.status}
                          </td>
                          <td className="px-6 py-4">
                            {item.expectedSalary}
                          </td>
                          <td className="px-6 py-4">
                            {item.computedScore}
                          </td>
                          <td className="px-6 py-4 flex flex-row">
                            <Link to={`/candidate/input/${item.id}`} className="mr-3">
                              <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                <path d="M12.687 14.408a3.01 3.01 0 0 1-1.533.821l-3.566.713a3 3 0 0 1-3.53-3.53l.713-3.566a3.01 3.01 0 0 1 .821-1.533L10.905 2H2.167A2.169 2.169 0 0 0 0 4.167v11.666A2.169 2.169 0 0 0 2.167 18h11.666A2.169 2.169 0 0 0 16 15.833V11.1l-3.313 3.308Zm5.53-9.065.546-.546a2.518 2.518 0 0 0 0-3.56 2.576 2.576 0 0 0-3.559 0l-.547.547 3.56 3.56Z" />
                                <path d="M13.243 3.2 7.359 9.081a.5.5 0 0 0-.136.256L6.51 12.9a.5.5 0 0 0 .59.59l3.566-.713a.5.5 0 0 0 .255-.136L16.8 6.757 13.243 3.2Z" />
                              </svg>
                            </Link>
                            <a onClick={(e) => { e.preventDefault(); openDeleteModal({ id: item.id }); }}>
                              <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                <path stroke="currentColor" stroke-linejoin="round" stroke-width="2" d="M8 8v1h4V8m4 7H4a1 1 0 0 1-1-1V5h14v9a1 1 0 0 1-1 1ZM2 1h16a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1Z" />
                              </svg>
                            </a>
                          </td>
                        </tr>
                      )
                    })
                    :
                    <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700 dark:text-gray-600">
                      <td className="px-6 py-4 text-gray-900" colSpan={6}>
                        {loading ? <Spinner /> : 'No Candidates Found.'}
                      </td>
                    </tr>
                }
              </tbody>
            </table>
          </div>

        </div>

      </div>

    </Layout>
  );
}
