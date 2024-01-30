using System.Collections.Generic;
using Back_End.Users;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SnappFood_BackEnd.DataBase;
using SnappFood_BackEnd.Model;
using SnappFood_BackEnd.Users;

namespace SnappFood_BackEnd.Controllers
{
    [ApiController]
    [Route("Manager/[action]")]
    public class ManagerController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IDataBase _iDataBase;

        public ManagerController(IUserService userService, IDataBase iDataBase)
        {
            _userService = userService;
            _iDataBase = iDataBase;
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public ActionResult<Session> Login([FromBody] ManagerModel managerModel)
        {
            if (managerModel?.email is null || managerModel.password is null)
                return Unauthorized("This Id and Password combination does not exist");

            var session = _userService.GetManagerSession(managerModel.email, managerModel.password);
            if (session is null)
                return Unauthorized("This Id and Password combination does not exist");

            return Ok(session);
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public ActionResult<Session> Register([FromBody] ManagerModel managerModel)
        {
            if (managerModel?.email is null)
                return BadRequest("Please Enter username");
            if (managerModel.password is null)
                return BadRequest("Please Enter password");
            if (managerModel.restaurantName is null)
                return BadRequest("Please Enter Restaurant Name");
            if (_userService.ExistsManager(managerModel.email))
                return Conflict("This Username has been token!");
            var manager = new Manager.Manager(managerModel.email, managerModel.password);
            manager.MakeRestaurant(managerModel.restaurantName, managerModel.address, managerModel.restaurantRegion,
                managerModel.coveredRegions, managerModel.sendFoodTime, managerModel.sendFoodPrice,
                managerModel.startWorkTime, managerModel.endWorkTime);
            Session session = _userService.AddManager(manager);

            return session is null ? Problem("some errors occurred") : Ok(session);
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public ActionResult<RestaurantModel> RestaurantInfo([FromHeader] string token)
        {
            if (token is null)
                return BadRequest("Not Authorized");
            var manager = _iDataBase.ReadManagerSession(token);
            if (manager is null)
            {
                return Unauthorized("Please Login first.");
            }

            return Ok(manager.GetRestaurant());
        }

        [HttpPost] //todo put
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public ActionResult<RestaurantModel> EditRestaurant([FromBody] RestaurantModel restaurantModel,
            [FromHeader] string token)
        {
            if (token is null)
                return BadRequest("Not Authorized");
            var manager = _iDataBase.ReadManagerSession(token);
            if (manager is null)
                return Unauthorized("Please Login first.");
            manager.EditRestaurant(restaurantModel.restaurantName, restaurantModel.address,
                restaurantModel.restaurantRegion,
                restaurantModel.coveredRegions, restaurantModel.sendFoodTime, restaurantModel.sendFoodPrice,
                restaurantModel.startWorkTime, restaurantModel.endWorkTime);
            return Ok(manager.GetRestaurant());
        }


        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public ActionResult<string> AddFood([FromBody] FoodModel foodModel, [FromHeader] string token)
        {
            if (token is null)
                return BadRequest("Not Authorized");
            var manager = _iDataBase.ReadManagerSession(token);
            if (manager is null)
                return Unauthorized("Please Login first.");

            if (foodModel?.name is null || foodModel.discription is null || foodModel.isEnable is null ||
                foodModel.price is null)
                return BadRequest("Please Complete Fields");

            if (!manager.AddFood(foodModel.name, foodModel.discription, foodModel.price.Value,
                foodModel.isEnable.Value))
                return Problem("Internal Error");
            return Ok();
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public ActionResult<IEnumerable<FoodModel>> GetFoods([FromHeader] string token)
        {
            if (token is null)
                return BadRequest("Not Authorized");
            var manager = _iDataBase.ReadManagerSession(token);
            if (manager is null)
                return Unauthorized("Please Login first.");
            return Ok(manager.GetFoods());
        }

        [HttpPut]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public ActionResult<string> ChangeAvailabilityFood([FromBody] FoodModel foodModel, [FromHeader] string token)
        {
            if (token is null || foodModel?.id is null || foodModel.isEnable is null)
                return BadRequest("Not Authorized");
            var manager = _iDataBase.ReadManagerSession(token);
            if (manager is null)
                return Unauthorized("Please Login first.");
            if (manager.ChangeAvailability(foodModel.id, foodModel.isEnable.Value))
            {
                return Ok();
            }

            return Problem("Some Errors Occurred");
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public ActionResult<string> DeleteFood([FromBody] FoodModel foodModel, [FromHeader] string token)
        {
            if (token is null || foodModel?.id is null)
                return BadRequest("Not Authorized");
            var manager = _iDataBase.ReadManagerSession(token);
            if (manager is null)
                return Unauthorized("Please Login first.");
            if (manager.DeleteFood(foodModel.id))
            {
                return Ok();
            }

            return Problem("Some Errors Occurred");
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public ActionResult<IEnumerable<OutOrderModel>> GetOrders([FromHeader] string token)
        {
            if (token is null)
                return BadRequest("Not Authorized");
            var manager = _iDataBase.ReadManagerSession(token);
            if (manager is null)
                return Unauthorized("Please Login first.");
            return Ok(manager.GetOrders());
        }

        [HttpPut]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public ActionResult<string> AcceptOrder([FromBody] OutOrderModel outOrderModel, [FromHeader] string token)
        {
            if (token is null)
                return BadRequest("Not Authorized");
            var manager = _iDataBase.ReadManagerSession(token);
            if (manager is null)
                return Unauthorized("Please Login first.");
            if (manager.AcceptOrder(outOrderModel.id))
                return Ok("Order Accepted");
            return Problem("Some Errors Occurred");
        }
    }
}