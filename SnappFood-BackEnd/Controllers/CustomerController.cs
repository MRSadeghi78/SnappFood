using System;
using System.Collections.Generic;
using System.Linq;
using Back_End.Users;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SnappFood_BackEnd.DataBase;
using SnappFood_BackEnd.Model;
using SnappFood_BackEnd.Restaurant;
using SnappFood_BackEnd.Users;

namespace SnappFood_BackEnd.Controllers
{
    [ApiController]
    [Route("Customer/[action]")]
    public class CustomerController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IDataBase _iDataBase;

        public CustomerController(IUserService userService, IDataBase iDataBase)
        {
            _userService = userService;
            _iDataBase = iDataBase;
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public ActionResult<Session> Login([FromBody] CustomerModel customerModel)
        {
            if (customerModel?.phone is null || customerModel.password is null)
                return Unauthorized("This Id and Password combination does not exist");

            var session = _userService.GetCustomerSession(customerModel.phone, customerModel.password);
            if (session is null)
                return Unauthorized("This Id and Password combination does not exist");
            return Ok(session);
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public ActionResult<Session> Register([FromBody] CustomerModel customerModel)
        {
            if (customerModel?.phone is null)
                return BadRequest("Please Enter username");
            if (customerModel.password is null)
                return BadRequest("Please Enter password");
            if (customerModel.name is null)
                return BadRequest("Please Enter Name");
            if (_userService.ExistCustomer(customerModel.phone))
                return Conflict("This Username has been token!");
            var customer = new Customer.Customer(customerModel.phone, customerModel.password, customerModel.name,
                customerModel.address, customerModel.region);
            Session session = _userService.AddCustomer(customer);
            return session is null ? Problem("some errors occurred") : Ok(session);
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public ActionResult<RestaurantModel> Info([FromHeader] string token)
        {
            if (token is null)
                return BadRequest("Not Authorized");
            var customer = _iDataBase.ReadCustomerSession(token);
            if (customer is null)
            {
                return Unauthorized("Please Login first.");
            }

            return Ok(customer.GetInfo());
        }

        [HttpPost] //todo put
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public ActionResult<CustomerModel> Edit([FromBody] CustomerModel customerModel, [FromHeader] string token)
        {
            if (token is null)
                return BadRequest("Not Authorized");
            var customer = _iDataBase.ReadCustomerSession(token);
            if (customer is null)
                return Unauthorized("Please Login first.");
            customer.EditCustomer(customerModel.name, customerModel.address, customerModel.region);
            return Ok(customer.GetInfo());
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public ActionResult Order([FromBody] InpOrderModel inpOrderModel, [FromHeader] string token)
        {
            if (token is null)
                return BadRequest("Not Authorized");
            var customer = _iDataBase.ReadCustomerSession(token);
            var restaurantId = _iDataBase.ReadFood(inpOrderModel.foodIds[0]).RestaurantId;
            Console.WriteLine(restaurantId+":rid");
            Console.WriteLine(inpOrderModel.foodIds[0]);
            var restaurant = _iDataBase.ReadRestaurant(restaurantId);
            if (customer is null)
                return Unauthorized("Please Login first");
            if (restaurant is null)
                return BadRequest("Not A Restaurant");
            if (restaurant.AddOrder(inpOrderModel, customer))
                return Ok();
            return Problem("Some Errors Occurred");
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult<IEnumerable<FoodModel>> GetFoods([FromQuery] string restaurantName, [FromQuery] int? region,
            [FromQuery] string foodName)
        {
            var foodModels = new List<FoodModel>();

            var restaurants = _iDataBase.ReadRestaurant(region);

            restaurants = restaurants.FindAll(restaurant => restaurant.Name.Contains(restaurantName ?? ""));
            restaurants.ForEach(restaurant =>
                restaurant.GetFoods().FindAll(food => food.Name.Contains(foodName ?? "")&&food.Available)
                    .ForEach(food => foodModels.Add(new FoodModel(food))));
            
            return foodModels;
        }
    }
}