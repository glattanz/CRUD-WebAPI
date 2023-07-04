using CRUD_API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CRUD_API.Controllers
{
    [ApiController]
    [Route("api/[controller]")] //O colchetes servr para representar o nome do controller
    public class PersonController : ControllerBase
    {
        private readonly Context _context;

        public PersonController(Context context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Person>>> List()
        {
            return await _context.People.ToListAsync();
        }

        [HttpGet("{personId}")]
        public async Task<ActionResult<Person>> Get(int personId)
        {
            var person = await _context.People.FindAsync(personId);

            if (person == null)
            {
                return NotFound();
            }

            return person;
        }
        
        [HttpPost]
        public async Task<ActionResult<Person>> Create(Person person)
        {
            await _context.People.AddAsync(person);
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpPut]
        public async Task<ActionResult> Update(Person person)
        {
            _context.People.Update(person);
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete("{personId}")]
        public async Task<ActionResult> Delete(int personId)
        {
            var person = await _context.People.FindAsync(personId);

            if (person == null)
            {
                return NotFound();
            }

            _context.Remove(person);
            await _context.SaveChangesAsync();

            return Ok();
        }
    }    
}