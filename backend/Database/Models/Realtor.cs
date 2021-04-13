using System.ComponentModel.DataAnnotations;

namespace backend.Database.Models
{
    public class Realtor
    {
        /// <summary>
        /// The Id of the realtor, also the Id of the Realtor in the Funda responses
        /// </summary>
        [Required]
        public int Id { get; set; }

        /// <summary>
        /// Name of the realtor
        /// </summary>
        [MaxLength(255)]
        [Required]
        public string Name { get; set; }

        /// <summary>
        /// Total amount of objects indexed by the indexer
        /// </summary>
        public int Objects { get; set; }

        /// <summary>
        /// Total amount of objects with a garden indexed by the indexer
        /// </summary>
        public int ObjectsWithGarden { get; set; }
    }
}
