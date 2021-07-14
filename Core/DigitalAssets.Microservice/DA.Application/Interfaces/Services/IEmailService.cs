using DA.Application.DTO.EMail;
using System.Threading.Tasks;

namespace DA.Application.Interfaces.Services
{
    public interface IEmailService
    {
        Task SendAsync(EmailRequest request);
    }
}
