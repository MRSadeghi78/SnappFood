using Back_End.Users;

namespace SnappFood_BackEnd.Users
{
    public interface IUserService
    {
        public Session AddManager(Manager.Manager manager);
        public Session AddCustomer(Customer.Customer customer);

        public bool ExistsManager(string userName);
        public bool ExistCustomer(string userName);

        public Session GetManagerSession(string userName, string password);
        public Session GetCustomerSession(string userName, string password);

        public Session CreateSession();
    }
}