using Back_End.Users;
using SnappFood_BackEnd.DataBase;

namespace SnappFood_BackEnd.Users
{
    public class UserService :IUserService
    {
        private static IDataBase _dataBase = DataBaseMock.GetInstance();
         
        private readonly IUserAuthenticationManager _authenticationManager;

        public UserService( IUserAuthenticationManager authenticationManager)
        {
            _authenticationManager = authenticationManager;
        }

        public Session AddManager(Manager.Manager manager)
        {
            if (ExistsManager(manager.UserName))
                return null;
            manager.Salt = _authenticationManager.GenerateSalt();
            manager.Hashed = _authenticationManager.GenerateHash(manager.Password, manager.Salt);
            _dataBase.CreateManager(manager);
            return GetManagerSession(manager.UserName, manager.Password);
        }

        public Session AddCustomer(Customer.Customer customer)
        {
            if (ExistsManager(customer.UserName))
                return null;
            customer.Salt = _authenticationManager.GenerateSalt();
            customer.Hashed = _authenticationManager.GenerateHash(customer.Password, customer.Salt);
            _dataBase.CreateCustomer(customer);
            return GetCustomerSession(customer.UserName, customer.Password);
        }

        public bool ExistsManager(string userName)
        {
            return _dataBase.ReadManager(userName)!=null;
        }

        public bool ExistCustomer(string userName)
        {
            return _dataBase.ReadCustomer(userName)!=null;

        }

        public Session GetManagerSession(string userName, string password)
        {
            var manager = _dataBase.ReadManager(userName);
            if ( manager is not null && manager.Hashed == _authenticationManager.GenerateHash(password, manager.Salt))
            {
                manager.Session = CreateSession();
                if (_dataBase.CreateManagerSession(manager))
                    return manager.Session;
            }
            return null;
        }

        public Session GetCustomerSession(string userName, string password)
        {
            var customer = _dataBase.ReadCustomer(userName);
            if ( customer is not null && customer.Hashed == _authenticationManager.GenerateHash(password, customer.Salt))
            {
                customer.Session = CreateSession();
                if (_dataBase.CreateCustomerSession(customer))
                    return customer.Session;
            }
            return null;
        }

        public Session CreateSession()
        {
            return new(_authenticationManager.GenerateSessionId());
        }
    }
}