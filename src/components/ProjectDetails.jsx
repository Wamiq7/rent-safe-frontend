import { Link, useParams } from 'react-router-dom';
import { BiSolidMap } from 'react-icons/bi';
import { FaCircleDollarToSlot } from 'react-icons/fa6';
import { useEffect, useState } from 'react';
import Container from './Container';
import Members from './Members';
import loading from "../../public/SVG/loading.svg";
import projectsData from "../modules/projects.json"
import { RiArrowRightSLine } from "react-icons/ri";



function ProjectDetails() {
  const { uid } = useParams();
  const [project, setProject] = useState([]); 



  const fetchProject = async () => {
    const matchingProject = projectsData.projects.find(
      (item) => item.uid === uid
    );

    if (matchingProject) {
      setProject(matchingProject);
    }

  };
  useEffect(() => {
    fetchProject();
  }, []);



  if (!Object.keys(project).length > 0) {
    return (
      <div className="flex w-full py-10 justify-center text-slate-500">
        <img alt="loader" src={loading} />
      </div>
    );
  }

  return (
    <div className="flex flex-col max-w-screen-sm md:max-w-none lg:max-w-none items-center justify-center mx-3 relative">
      <Container>
        <div className="flex w-full items-center justify-start flex-col md:flex-row relative">
          <div className="flex w-full items-center justify-center md:items-start md:justify-start px-5 md:w-auto ">
            <img
              alt="project"
              src={project?.thumbnail}
              className="aspect-video  mb-2 w-full  md:h-44 max  object-cover rounded-lg"
            />
          </div>
          {/* Heading */}
          <div className="flex flex-col w-full md:w-auto justify-start items-start  md:ml-0">
            <h1 className="text-2xl px-6 text-start font-medium text-slate-800 mb-6 ">
              {project?.title}
            </h1>
            {/* Domain */}
            <Link 
              className="text-accent px-6 my-2 text-base font-medium underline"
            >
              Posted by
              {' '}
              {project?.stateAgent.name}
            </Link>
            {/* Timestamp */}
            <p className="text-sm px-6 text-slate-600">
              Posted on
              {' '}
              {project?.createdAt}
            </p>
            <div className="flex px-6 flex-col my-5 gap-2">
              {/* City */}
              <p className="text-base flex items-center gap-2 text-slate-800">
                <BiSolidMap className="text-accent" />
                {' '}
                {project?.city}
              </p>
              <p className="text-base flex items-center gap-2 text-slate-800">
                <BiSolidMap className="text-accent" />
                {' '}
                {project?.area}
              </p>

            </div>
          </div>
        </div>

        <div className="flex w-full border-t py-3">
          {/* description */}
          <h1 className="description px-6">{project?.description}</h1>
        </div>
        {/* Pricing */}
        <div className="flex justify-start gap-8 w-full border-t pt-3 pb-6">
          <div className="flex text-base px-6 text-start font-normal gap-3 items-start">
            <FaCircleDollarToSlot className="text-accent mt-2" />
            <p className="text-base font-medium">
              Rs.
              {' '}
              {project?.rent}
              {' '}
              <br />
              {' '}
              <span className="text-sm font-light text-slate-600">
                Rent Amount
              </span>
            </p>
          </div>
          {/* Experience Level */}
          <div className="flex text-base px-6 text-start font-normal gap-3 items-start">
            <p className="text-base font-medium">
              {project?.timeframe}
              {' '}
              <br />
              {' '}
              <span className="text-sm font-light text-slate-600">
                Listed Date
              </span>
            </p>
          </div>
          <div className="flex text-base px-6 text-start font-normal gap-3 items-start">
            <p className="text-base font-medium">
              {project?.floor}
              {' '}
              <br />
              {' '}
              <span className="text-sm font-light text-slate-600">
                Floor
              </span>
            </p>
          </div>
        </div>
        <div className="flex w-full border-t py-3">
          {/* Contract type */}
          <p className="text-base capitalize px-6 text-start font-normal text-slate-800">
            <span className=" font-medium">Property Status:</span>
            {' '}
            {project?.status}
            {' '}
            property
          </p>
        </div>

          <div className="flex flex-col md:flex-row md:gap-64 gap-8 w-full border-t py-3 px-6">
            <div className="flex flex-col items-start justify-start gap-3">
              <h1
                className="text-xl font-semibold text-slate-800"
              >
                Property Owner
              </h1>
              <Members
                  image={`${project?.landlord.image}`}
                  walletAddress={`${project?.landlord.walletAddress}`}
                  name={`${project?.landlord.name}`}
                  cnic={`${project?.landlord.cnic}`}
                  className="font-medium"
                  imageclass="w-[10vw] md:w-14"
                />
            </div>
            <div className="flex flex-col items-start justify-start gap-3">
              <h1
                className="text-xl font-semibold text-slate-800"
              >
                Tenant
              </h1>

                <Members
                  image={`${project?.tenant.image}`}
                  walletAddress={`${project?.tenant.walletAddress}`}
                  name={`${project?.tenant.name}`}
                  cnic={`${project?.tenant.cnic}`}
                  className="font-medium"
                  imageclass="w-[10vw] md:w-14"
                />

            </div>
            <div className="flex flex-col items-start justify-start gap-3">
              <h1
                className="text-xl font-semibold text-slate-800"
              >
                State Agent
              </h1>

                <Members
                  image={`${project?.stateAgent.image}`}
                  walletAddress={`${project?.stateAgent.walletAddress}`}
                  name={`${project?.stateAgent.name}`}
                  cnic={`${project?.stateAgent.cnic}`}
                  estateName={`${project?.stateAgent.estateName}`}
                  className="font-medium"
                  imageclass="w-[10vw] md:w-14"
                />

            </div>
          </div>

        {/* <div className="flex flex-row items-center w-full border-t py-3 px-6 gap-4">
          <p className="flex items-center text-lg my-3 text-start font-medium text-slate-800">
            Upgrade your membership to see bid range */}
        {/* ----------TODO: Tooltip Style ----! pending */}
        {/* </p>
          <div
            className="tooltip"
            data-tip="Displays a range for the proposed bids"
          >
            <AiFillQuestionCircle className="text-base text-accent ml-2" />
          </div>
        </div> */}
      </Container>
      {/* Apply Button */}

          <div className="flex md:relative 2xl:absolute 2xl:w-96 md:w-4/5 2xl:bg-transparent 2xl:-top-[69%] 2xl:right-[21%] fixed bottom-0 bg-white gap-2 w-full border-t md:border-0 md:bottom-4 border-slate-300 py-2 items-center justify-center z-10 px-3">

            <div className="flex justify-between  items-center cursor-pointer bg-accent hover:bg-accent/50 rounded-lg text-white font-semibold text-center">
              <a
                href={`/agreements/create/${uid}`}
                className="flex p-3 md:p-4 items-center justify-center"
              >
                Create Agreement
                <RiArrowRightSLine className="ml-2 text-md" />
              </a>
            </div>
          </div>

    </div>
  );
}

export default ProjectDetails;
