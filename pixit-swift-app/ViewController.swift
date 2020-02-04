//
//  ViewController.swift
//  Pixit Mobile
//
//  Created by Thomas Nelson on 2/1/20.
//  Copyright © 2020 Thomas Nelson. All rights reserved.
//

import UIKit

class ViewController: UIViewController {
    @IBOutlet weak var email: UITextField!
    @IBOutlet weak var password: UITextField!
    @IBOutlet weak var sign_in: UIButton!
    @IBOutlet weak var sign_up: UIButton!
    
    override func viewDidLoad() {
        super.viewDidLoad()
    
    }
    @IBAction func Return(_ sender: Any) {
        resignFirstResponder()
    }
    
    @IBAction func toSignUp(_ sender: Any) {
        performSegue(withIdentifier: "toSignUp", sender: self)
    }
    
    @IBAction func toPage(_ sender: Any) {
        dude(email.text ?? " ", password.text ?? " ", completionHandler: {data,response,error in
        
            guard let data = data,
                let response = response as? HTTPURLResponse,
                error == nil else {                                              // check for fundamental networking error
                print("error", error ?? "Unknown error")
                return
            }

            guard (200 ... 299) ~= response.statusCode else {                    // check for http errors
                print("statusCode should be 2xx, but is \(response.statusCode)")
                print("response = \(response)")
                return
            }

            let responseString = String(data: data, encoding: .utf8)
            print("responseString = \(responseString)")
        })
        
    }
    
}

