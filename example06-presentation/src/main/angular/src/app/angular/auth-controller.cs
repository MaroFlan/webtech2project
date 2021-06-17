return Ok(new
            {
                result = result,
                token = JwtTokenGeneratorMachine(user).Result
            });
