﻿using SigmaMovies.Application.Movies.Requests;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SigmaMovies.Application.Actors.Requests
{
    public class ActorRequestPutModelNoNested
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Img { get; set; }
    }
}
