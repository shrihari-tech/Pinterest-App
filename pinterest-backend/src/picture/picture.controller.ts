import { Controller, Get, Post, Param, Body, Req } from '@nestjs/common';
import { PictureService } from './picture.service';

@Controller('pictures')
export class PictureController {
  constructor(private readonly pictureService: PictureService) {}
  @Get('/seed')
  async seedPictures() {
    const pictures = [
      { title: 'Sunset', url: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAKIAoQMBIgACEQEDEQH/xAAbAAACAwEBAQAAAAAAAAAAAAACAwABBAUGB//EAEYQAAECAwMFDAgFAwMFAQAAAAEAAgMEEQUSIRMxQZHRFBUiQlJTYWKBkqHBMlFjcZOisfAGQ1SC4XODozM0RCMkRWRyFv/EABoBAAMBAQEBAAAAAAAAAAAAAAABAgMEBQb/xAAzEQACAQMCBAMGBAcAAAAAAAAAAQIDERITURQxQVIEkaEhQlNhYoEFMkPRFSJxkqKx8P/aAAwDAQACEQMRAD8AsoHBPLEJYvoDUzOSyFrMNAYaYzIQhLVqMNAWJ3CxmLVV1PLEBaqyJxQm6quppDkJTzFpiy1VdRlCVWoLTBuqUVlUnqIWmy7qsBDVWCqU0J02MDUYalAogU1InFjQEQCWCjBVXFiFRRVVRK48Tv5FCYK6uTVZJcZWRyjBQmAutkVRgphkcgy6Ey66+RVGD1UBkcUy6Eyy7WQQmXQPM4hlksy67hl+qhdLKrBqHCMugMuu2ZZA6WVqJOqzimAhMJdZ0ulOgK1FEuqzmmGqya3OgoDCV2RObMlxSi0mGhyadkLJiQiAR3FdxHsKAoojuKJXA9wIKLIJwiNV315SqG7g9hGQVGAtBehvqtUnBmfIKsgtV9XVqrUFizJkVRhLYhIVKZOLMZhIDDWwhA4K1MWLMTmJT2La4JDwq1BYmNzEl7FsekvzJ6g8DG5iU5i1PDkh4cnmPAQWICxMcyJyUt0OOnmViCWoSGqOgR0sy8XlIyHig6NUS9zxeUojIeK3Poolle5nLoC9yFKu5K+eUzuuc8y7uSgMFy6RPVQE9VUqgjmmGqpRdBx6qU5zeSrVRhZGIoC9anuas73NVKqCppijEQmK1W57eSdSSXdV2pUq7DQTCL2oC9qo/wDy7UhuO5L9SriGHDx3IXNQG6mZF3JfqViWdyYupWq72IdBbiC1C6Hh6S1bl6sXUpuVvJfqWqrGbpfMxOhdZJdAbyl0jLt5LtSEwYfJdqVqqiMGct0s3lFKMq1dcw4XJdqVXYXJ8E9RBizkblaouvdhcnwUTzQWex2ja3Vcgda7eS7WuaY7zjcYhLq43Wav5XyfFI9zgzoOtZvWSolq9ZywFrepqCEsbym6gq4lD4NGiJaTjxkh0+7nCgLYPGd4BV/2vTqCfED4ZIm7nct3ir3c7lfVS/LDC6dQU3TAZ+X4BWq4OgtixPO+wUTZ132CgM9C5s+CEz8Lm3K1WZDpfI0tnnfbCmtn4n21c42hC5lyB1pM/TeC1VV7mbprY7An4vRqRiei8rwXn3WqR6MDwS3WvH4rCOxaKo9zJ0l2npRNRzj5IhGivXlHWrOcl6WbTnOS9bKf1EOj9J7CsV2GCmRf1V47fO0NF+im+Np8p60VWPcZuhPoj2O5a48FTccPTnXjt3Wm/wDMehMe0XelFfrVa0NyeGqns9xwlF4u9Pc6/vKJ61PcXC1j6WPwy3jRB99qL/8ANQOcatZlIfGtH/J/KEyEscXT/wDk/lfHqM3+i/7l+5txFTvfkZT+HJbTEGtA78PyY/NZ3lr3tkeNO/5RtU3rs39VX+8NqvSqdKX+S/cfEy735GB1hSLfzWd5KfZEi3HKwtYXVFk2VzoP9wIhZdmdQ/vCejV7UvuUvFte9LyOC+zpHnIWsJD5GRH5jF6cWfZwwbDhawi3LJs/Jh+GxQ4TXNpFrxv9TyDpKR5TEsyMj1dS9kRLs9GDD++xAYsNuORh6/4WbrKPOa9S142XRPzPH7hk+juqb3SfW1L1jppnNQtZ2JTpz2cLW7Ysn+IUo85r1LXiZv3fU8yLNk+ur3tlesvQPnPZwdbtiQ6c6kH59iX8Up9JItVZvocfe6XVb3wF1HTvVl/m2JTp1vJl/mVx/E4vkyk5voYNwwFRk5b7qtpnm/8Ar/MgNoQ+TB+ZdEfxC48JPozGZST6dRVbmk+tqcte+MLkwvFTfCFyWeK2j417CdGexk3NJ9bU5Ra98IfJZ4qlfGsNGex5c/hOAcd8pv4jdisfhKA3EWlN1/qM2LrZLpef3KiyJxYbj/cXN7P+R6WvW7zmN/DIbi20Jvvw9ia2wIjPRn5vvQ9i2FsfmB8T+EBE3ogMp/VOxLFfL0Fq1HzkKbZc2z0Z+a+TYmCUtJnoz0xqZsQEWhXCBDp/VOxARaeiFC+IdiNFPpH0Jc2+f+jQG2yz0Z6NqbsR5a3B/wA2LqbsWI7581C+IdiAutWv+lC75S4WL5xj5EPF816G8zFvaJx3aGqjGt/9X4NWAxLT5qF3ygMa0x+VC75TXg4dsfIi0F09DoGLbumdbqGxAX21+sZqGxYd0WrzULvnaq3ZaowyDO+7arXgqfZHyRLcdvQ2OdbH6tmr+Et77Wp/uWajsWbfC1f0ze+7apvnabf+J87tq1j4Kn8OPkiHUS3DdEtXnWH9p2JD4tp6Xs7pR78Wj+kOs7VRtufHpSz/AB2rePhKa/Tj6EOr9TM7pi0x6vhlLMzafJHwztWzf6a40B47FW/sXkP1LePh4fDRm68u9mEzdq8lnwztQmdtX2fwztW026/1U/YEJtvrDuBbKhD4aJdep3sx7utX2XwztUWvfvrN7gUV6EPhoWvU72IE/aH6yvYr3wtHnwew7U+JKNBAEGK4n1E7FYkcMGRgfevPsj1bGffCe5Y+bapvhOca58+1NMm7m4vjsQGTeHUdCjAH79SMUOwG+E1paynvftVG0IvGhs1v2pj5K7jk46WJS+athRjTOcEYoLFb4eyb33Kb5tHpQz8Q7FTpWhIyMc/sqlPlbv5EbUNqMUSx4tWBzUT4g2K9+JYcSOPc8bFiMFwBdueMei6D5rJFjBnpSsw33wqeaemmRKdjsb7ynGdNd5uxELYkeem293YvP7pa/gslorvXwBtUEYOw3NFDf6dR4FVpGeqj0BteR/WzTf2tVb5yJx3yj9sNebi5WopCuiumFn8UV1ulvyqlTt1M3Uv0PQm0JXiWpE7WHYhM7CP/AJIdrCPJedMNv2EJY37AVpNENp9D0RmWHHd0J3adiAxa47ohO/evPEN6fBAS3rawtFJozaiehc7pa73OSXn2a4ZidZ2sKCP1na1oqrRm4I7FfZKLkZfrHWoq1nsTgj1O7ZpwAa8POm5GLcdXvQG04pIhQxwweFemDUfJiqM2wEAGjRoBzLK6I10QubGjD1gRDRcuKPRc5LkzfDtCZEWl9zmeq8SfBoRxJ6OcGiICPU8bCuU85Q1MeYGHOEUHYVkE7GZFcyE6aDc1SQR4hLBCdZx9jO7uybYx1WF5GLbzwT9Akbtn3cItZCdoFwEawVjZHe41MWJepQ3jXwQOMRjv+mLzTnvRD9KeaeCB1WzREtOKCbwL3DO5jMK9FUl05NEgtilvrDqkjsoga48PKtF3QLxKS6LDAGShUOm60hUooylOW5odOhxpEjxHGmiX86JLZ0scS2JEiU0uPlRLZG4JvQznxoK1OtVMRmubd4FRnbWn0ITsiXJ25hRLQiEBrXtBJ4rgT4pItCLjdYajAlzmoDGayE0mGKiuLW/TPVIy7CzM0uaa4G8Ge/HFOyMnN7mjfOM40wpoukfVA60Y4ceASRnuubh4pL5hpcy9HoBjhjjr8El804uLnxcAagZvJOyIc3uNfMxXEOJcRpwCF0044NhOJOnBKhzcfPfxrQNLga+Ct83EMSjiARxcK/fagjK/Usvi0whvu+4JTnxdDX000ofJQPgEkuAafcKohGuHB9eyvkgX3EmLFpg14FfV5IXRn8YPA6KlEH1e4ZS7U1rdCvhZSoN6nFwHkncm3zE5b2sXvFRaLvsnd1u1RILPc64mnBwGShBulwcT5I3zlMasDRpJoFyI01k4gZueMa4ghuGtMZMsdgyE/KDE8IYDpwSsdGr0ubxPseeDFhnpDgoZrhgGK2pCxmIXYOhE9JaFQNTRzXXQMMG0PggebGzD5iI0ls0W+q6aeSrLRWQg2PMPLc5LgX1KS1jG1LQ8eul0DUAoYbIjS2K0UOfMgl3D3VKueQ2Ixz6aCQOzBG55pUQoZJzBjr3kkQ5aEzBrGgDxQvmxCiENhOewUxLgB4oJvZfzewZWM7gvbwRxbpFe2io3m0IDWiuZpofoggxhHLiyJFvAUIDyaY00tokxYxbFLr8Vzxn4NWjoz50xOStc0uD3PL3NOTaND8T78FnLWOGIo2uAOA1KoLsuSRlIbBjiwYnWoY74tGy4eL1RV2enRQoJumU14iOIa84V0kj+FbW3GNimI8aacLzKp0a7RkOJwgOFUOdXHpr0IQ9znXr96G01cboAr2IJ9nUoBpaMXOJ0EYI8zvTLS4YADMNVEIL6Em4Xu4ztA1fdFbfRIyjM1NHkUxIG69rwWxaCmYuqSrbnBDnAk4E4KRTBhtuk3n+oA0PklCLCc00Fxue8BTNorVAnZOwyGaOc1rzQD1ig7UBcxocXPJc6nTh24BUXQmOY3OaA1c2oVuME3i4lxI4IufeCBdA6u6yiy34nNM7iiCbvc1QYsR0aMC9xF7MStLM/b5K1EjoXM0tzn3Fa4Pot93koos5cjqp8xbsMRhgFkdxvcVFE4ciKgELT7tqwz3+4DdBbWiii0RzVfyD5fCz4RGBvbUc0KwYdeUPoVFEkP3PsOaxolahoqejpCwzrW0ZwRmOj3qKJrmRPkGXOEJgDiAD60LzWKyuOb6K1EDfJEGamj1dqOE1rYRutAz5h0KKI6D94TMONzOc6qHjUnEhuB9WZRRLoS/zAw3ON2pJ4I0p8x/p/2x9FFEDXJnHUUUVnGf/Z', likes: 0, tags: ['nature', 'sunset'] },
      { title: 'Mountain', url: 'data:image/jpeg;base64,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', likes: 0, tags: ['nature', 'mountain'] },
    ];

    return await this.pictureService.seed(pictures);
  }

  @Get()
  getAllPictures() {
    return this.pictureService.getAllPictures();
  }

  @Post(':id/like')
  async likePicture(@Param('id') id: string, @Req() req: any) {
  const userId = req.user ? req.user.id : '60a3b6b5f3f4d3b3b8b9b1b1';
  return this.pictureService.likePicture(id, userId);
}


  @Post(':id/tag')
  addTag(@Param('id') id: string, @Body('tag') tag: string) {
    return this.pictureService.addTag(id, tag);
  }

  @Post(':id/follow')
  async followPicture(@Param('id') id: string, @Req() req: any) {
    const userId = req.user ? req.user.id : '60a3b6b5f3f4d3b3b8b9b1b1';
    return this.pictureService.followPicture(id, userId);
  }

  @Post(':id/unfollow')
  async unfollowPicture(@Param('id') id: string, @Req() req: any) {
    const userId = req.user ? req.user.id : '60a3b6b5f3f4d3b3b8b9b1b1';
    return this.pictureService.unfollowPicture(id, userId);
  }
}
