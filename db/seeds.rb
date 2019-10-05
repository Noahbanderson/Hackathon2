User.create(email: "test@test.com", password: "password", password_confirmation: "password", name: "John", nickname: "Johnny")

User.create(email: "test1@test.com", password: "password", password_confirmation: "password", name: "Jack", nickname: "Jacks") 

User.create(email: "test2@test.com", password: "password", password_confirmation: "password", name: "Joyce", nickname: "Joy")

10.times do 
  u = User.create(email: Faker::Internet.email, password: "password", password_confirmation: "password", name: Faker::Name.name, nickname: Faker::Esport.player)
  
  10.times do
    v = Video.create(title: Faker::DcComics.title, duration:rand(3..15), genre: Faker::Superhero.suffix, descriptions: Faker::Hacker.say_something_smart, trailer: "https://www.youtube.com/embed/3x2ABSAMVno", user_id: u.id)
    
    10.times do 
      c = Comment.create(body: Faker::Hipster.sentence, user_id:rand(1..10), video_id: rand(1..10))
      # rand(1..10) 
    end 
  end

  10.times do 
      c = Comment.create(body: Faker::GreekPhilosophers.quote, user_id: u.id, video_id: rand(1..10)) 
  end 

end

puts "I seeded things"