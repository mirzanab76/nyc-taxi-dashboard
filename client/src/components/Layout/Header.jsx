const Header = () => {
    return (
      <header className="bg-white shadow">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-bold text-gray-900">NYC Taxi Dashboard</h1>
            <nav>
              <a 
                href="https://data.cityofnewyork.us/Transportation/2014-Yellow-Taxi-Trip-Data/gkne-dk5s"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900"
              >
                Data Source
              </a>
            </nav>
          </div>
        </div>
      </header>
    );
  };
  
  export default Header;