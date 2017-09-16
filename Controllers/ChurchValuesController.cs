using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using EventStore.Models;
using EventStore.Models.BindingTargets;

namespace EventStore.Controllers
{
    [Route("api/churchies")]
    public class ChurchValuesController : Controller
    {
        private DataContext context;
        public ChurchValuesController(DataContext ctx)
        {
            context = ctx;
        }

        /// <summary>
        /// Вывод всего списка зарегистрированных церквей 
        /// </summary>
        /// <returns>Перечисление объектов церкви</returns>
        [HttpGet]
        public IEnumerable<Church> GetChurchies()
        {
            return context.Churchies;
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        /// <summary>
        /// Добавление объекта церковь
        /// </summary>
        /// <param name="churchParam">Данные о церкви</param>
        /// <returns>Код ответа Http</returns>
        [HttpPost]
        public IActionResult CreateChurch([FromBody]ChurchData churchParam)
        {
            if (ModelState.IsValid)
            {
                Church newChurch = churchParam.Church;
                context.Add(newChurch);
                context.SaveChanges();
                return Ok(newChurch.ChurchId);
            }
            else
            {
                return BadRequest(ModelState);
            }
        }

        /// <summary>
        /// Изменение церкви
        /// </summary>
        /// <param name="id">Идентификатор церкви</param>
        /// <param name="cdata">Новый объект церкви</param>
        /// <returns>Код ответа Http</returns>
        [HttpPut("{id}")]
        public IActionResult ReplaceChurch(long id, [FromBody] ChurchData cdata)
        {
            if (ModelState.IsValid)
            {
                Church c = cdata.Church;
                c.ChurchId = id;
                context.Update(c);
                context.SaveChanges();
                return Ok();
            }
            else
            {
                return BadRequest(ModelState);
            }
        }       

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void DeleteChurch(long id)
        {
            context.Churchies.Remove(new Church { ChurchId = id });
            context.SaveChanges();
        }
    }
}
