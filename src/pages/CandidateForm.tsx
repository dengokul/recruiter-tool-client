import { useEffect, useState } from "react";
import Layout from "components/layout/Layout";
import useForm from "helpers/useForm";
import { candidateFormValidate } from "helpers/validateRules";
import { StringMap } from "interfaces";
import candidateServices from "services/candidate";
import { errorCode } from "utils/ServiceAPIUtil";
import { useNavigate, useParams } from "react-router-dom";

const initialValues: StringMap = {
  id: "",
  name: "",
  email: "",
  phoneNumber: "",
  qualifications: "",
  status: "",
  reactjsExp: "",
  nodejsExp: "",
  expectedSalary: 0
};

const CandidateForm = (): JSX.Element => {
  const navigate = useNavigate();
  const params = useParams();
  const { cid } = params;
  const { values, errors, handleChange, handleSubmit, setUpdateValue } =
    useForm(initialValues, handleSubmitCB, candidateFormValidate);
  const [isLoading, setIsLoading] = useState(false);
  const [globalErrMsg, setGlobalErrMsg] = useState("");
  const { CreateCandidate, GetCandidates, UpdateCandidate } = candidateServices();

  useEffect(() => {
    if (cid) {
      getCandidate();
    }
  }, [cid]);

  const getCandidate = async () => {
    const getCData = await GetCandidates({ search: { cid } });
    if (getCData && getCData.length > 0) {
      const thisCData = getCData[0] || {};
      setUpdateValue('id', thisCData.id || "");
      setUpdateValue('name', thisCData.name || "");
      setUpdateValue('email', thisCData.email || "");
      setUpdateValue('phoneNumber', thisCData.phoneNumber || "");
      setUpdateValue('qualifications', thisCData.qualifications || "");
      setUpdateValue('status', thisCData.status || "");
      setUpdateValue('reactjsExp', thisCData.reactjsExp || "");
      setUpdateValue('nodejsExp', thisCData.nodejsExp || "");
      setUpdateValue('expectedSalary', thisCData.expectedSalary || 0);
    }
  }

  function handleSubmitCB() {
    setIsLoading(true);
    const formValues = {
      id: values.id,
      name: values.name,
      email: values.email,
      phoneNumber: values.phoneNumber,
      qualifications: values.qualifications,
      status: values.status,
      reactjsExp: values.reactjsExp,
      nodejsExp: values.nodejsExp,
      expectedSalary: parseInt(values.expectedSalary),
    };
    const InputForm = values.id ? UpdateCandidate : CreateCandidate;
    InputForm(formValues)
      .then((res) => {
        navigate('/candidates');
      })
      .catch((err: any) => {
        setGlobalErrMsg(errorCode(err) || "Something went wrong");
        setIsLoading(false);
      });
  }

  return (
    <Layout>
      <div className="flex flex-row max-h-screen justify-center items-center mt-20">
        <div className="w-9/12 p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
          <form className="space-y-6" action="#" onSubmit={handleSubmit}>
            <h5 className="text-xl text-center font-medium text-gray-900 dark:text-white">{values.id ? 'Update Candidate' : 'Create Candidate'}</h5>
            {
              globalErrMsg && <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                {globalErrMsg}
              </div>
            }
            <div className="grid lg:grid-cols-4 lg:gap-4">
              <div>
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                <input type="text" name="name" id="name" onChange={handleChange} value={values.name} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Enter name" />
                {errors.name && <span className="error-msg">{errors.name}</span>}
              </div>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                <input type="email" name="email" id="email" onChange={handleChange} value={values.email} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@example.com" />
                {errors.email && <span className="error-msg">{errors.email}</span>}
              </div>
              <div>
                <label htmlFor="phoneNumber" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone Number</label>
                <input type="text" name="phoneNumber" id="phoneNumber" onChange={handleChange} value={values.phoneNumber} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="987654321" />
                {errors.phoneNumber && <span className="error-msg">{errors.phoneNumber}</span>}
              </div>
              <div>
                <label htmlFor="qualifications" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Qualifications</label>
                <input type="text" name="qualifications" id="qualifications" onChange={handleChange} value={values.qualifications} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="qualifications" />
                {errors.qualifications && <span className="error-msg">{errors.qualifications}</span>}
              </div>
              <div>
                <label htmlFor="status" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Current Status</label>
                <select id="status" name="status" onChange={handleChange} value={values.status} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <option selected>Status</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Interview Scheduled">Interview Scheduled</option>
                  <option value="Offer Extended">Offer Extended</option>
                  <option value="Hired">Hired</option>
                  <option value="Rejected">Rejected</option>
                </select>
                {errors.status && <span className="error-msg">{errors.status}</span>}
              </div>
              <div>
                <label htmlFor="reactjsExp" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ReactJS Experience</label>
                <select id="reactjsExp" name="reactjsExp" onChange={handleChange} value={values.reactjsExp} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <option selected>Select</option>
                  <option value="1">Less than 1 year</option>
                  <option value="2">1-2 years</option>
                  <option value="3">Over 2 years</option>
                </select>
                {errors.reactjsExp && <span className="error-msg">{errors.reactjsExp}</span>}
              </div>
              <div>
                <label htmlFor="nodejsExp" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">NodeJS Experience</label>
                <select id="nodejsExp" name="nodejsExp" onChange={handleChange} value={values.nodejsExp} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <option selected>Select</option>
                  <option value="1">Less than 1 year</option>
                  <option value="2">1-2 years</option>
                  <option value="3">Over 2 years</option>
                </select>
                {errors.nodejsExp && <span className="error-msg">{errors.nodejsExp}</span>}
              </div>
              <div>
                <label htmlFor="expectedSalary" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Expected Salary</label>
                <input type="number" name="expectedSalary" onChange={handleChange} value={values.expectedSalary} id="expectedSalary" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="10000" />
                {errors.expectedSalary && <span className="error-msg">{errors.expectedSalary}</span>}
              </div>
            </div>

            <div className="text-center"><button type="submit" className="w-40 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" disabled={isLoading}>{isLoading ? 'Saving...' : 'Save'}</button></div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default CandidateForm;
