import { Link } from 'react-router-dom';

const FormContainer = ({ logo, buttonText, onSubmit, children }) => {
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6 border rounded-lg p-4" onSubmit={onSubmit}>

          {logo && (
            
            <div className="mb-4 text-center">
              <Link to='/'>
              <h2 className="text-2xl font-thin leading-9 tracking-tight text-gray-900">{logo}</h2>
              </Link>
            </div>
          )}
      
          {children}

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
            >
              {buttonText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormContainer;
